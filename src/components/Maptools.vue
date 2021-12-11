<template>
    <div class="maptools-view">
        <span class="maptools-item" @click="handleMaptoolsItemClick" id="xzqh">行政区导航</span>
        <span class="maptools-item" @click="handleMaptoolsItemClick" id="maptree">目录树管理</span>
        <el-dropdown trigger="click" class="maptools-item">
            <span class="el-dropdown-link">地图测量<i class="el-icon-arrow-down el-icon--right"></i> </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item icon="el-icon-plus">距离测量</el-dropdown-item>
                <el-dropdown-item icon="el-icon-circle-plus">面积测量</el-dropdown-item>
                <el-dropdown-item icon="el-icon-edit">自定义测量(长度)</el-dropdown-item>
                <el-dropdown-item icon="el-icon-edit">自定义测量(面积)</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
        <el-dropdown trigger="click" class="maptools-item" @command="handleCommand">
            <span class="el-dropdown-link">更多功能<i class="el-icon-arrow-down el-icon--right"></i> </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item icon="el-icon-search" command="spacequery">空间查询</el-dropdown-item>
                <el-dropdown-item icon="el-icon-film" command="morescreen">多屏对比</el-dropdown-item>
                <el-dropdown-item icon="el-icon-reading" command="swipanalyst">卷帘分析</el-dropdown-item>
                <el-dropdown-item icon="el-icon-picture-outline" command="printmap">地图打印</el-dropdown-item>
                <el-dropdown-item icon="el-icon-view" command="openPopup">开启图层弹窗</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
        <span class="maptools-item" @click="handleMaptoolsItemClick" id="clear">清屏</span>
    </div>
</template>

<script>
import { loadModules } from 'esri-loader';
import config from './config';

export default {
    name: 'Maptools',
    methods: {
        handleMaptoolsItemClick(e) {
            // console.log(e.target.id);
            switch (e.target.id) {
                case 'xzqh':
                    this.openXZQHPannel();
                    break;
                case 'maptree':
                    this.openMaptreePannel();
                    break;
                case 'clear':
                    break;
                default:
                    break;
            }
        },
        handleCommand(command) {
            switch (command) {
                case 'spacequery':
                    this.initSpaceQuery();
                    break;
                case 'morescreen':
                    this.$router.push('/onemap/one');
                    break;
                case 'swipanalyst':
                    this._initSwipe();
                    break;
                case 'printmap':
                    this._handlePrintMap();
                    break;
                case 'openPopup':
                    break;
                default:
                    break;
            }
        },
        //初始化空间查询
        async initSpaceQuery() {
            const _self = this;
            //绘制面状区域
            const view = _self.$store.getters._getDefaultMapView;
            const [SketchViewModel, Graphic, GraphicsLayer] = await loadModules(
                ['esri/widgets/Sketch/SketchViewModel', 'esri/Graphic', 'esri/layers/GraphicsLayer'],
                config.options,
            );

            const resultLayer = view.map.findLayerById('polygonGraphicLayer');
            if (resultLayer) view.map.remove(resultLayer);

            const graphicsLayer = new GraphicsLayer({
                id: 'polygonGraphicLayer',
                elevationInfo: {
                    mode: 'on-the-ground',
                },
            });
            view.map.add(graphicsLayer);

            const polygonSymbol = {
                type: 'simple-fill',
                color: [216, 30, 6, 0.4],
                style: 'solid',
                outline: {
                    color: '#d81e06',
                    width: 1,
                },
            };

            const sketchViewModel = new SketchViewModel({
                updateOnGraphicClick: false, //是否可以选择要更新的图形
                view,
                layer: graphicsLayer,
                polygonSymbol,
            });
            sketchViewModel.create('polygon'); //试用上述几何参数创建图形

            sketchViewModel.on('create-complete', function (event) {
                const graphic = new Graphic({
                    geometry: event.geometry,
                    symbol: sketchViewModel.graphic.symbol,
                });
                graphicsLayer.add(graphic);
            });

            sketchViewModel.on('create', function (event) {
                console.log(event.state);
                if (event.state === 'complete') {
                    //执行空间查询
                    _self.handleSpaceQuery(event.graphic);
                }
            });
        },

        handleSpaceQuery(graphic) {
            const _self = this;
            const view = _self.$store.getters._getDefaultMapView;
            const resultLayer = view.map.findLayerById('layerid');
            if (!resultLayer) {
                _self.$message({
                    message: '尚未添加业务图层，不能进行空间查询',
                    type: 'warning',
                });
                return;
            }

            const queryPoint = resultLayer.createQuery(); //FeatureLayer里的一个方法，用于空间查询
            queryPoint.geometry = graphic.geometry;
            resultLayer
                .queryFeatures(queryPoint)
                .then(function (results) {
                    let currentData = [];
                    if (results.features.length > 0) {
                        //符号化渲染图层
                        _self.renderResultLayer(results.features);
                        //实例化表格数据
                        results.features.map((item, index) => {
                            console.log(index, item.attributes);
                            currentData.push({
                                name: item.attributes.站名,
                                type: item.attributes.性质,
                                tieluju: item.attributes.铁路局,
                                address: item.attributes.车站地,
                                lon: item.attributes.WGS84_Lng,
                                lat: item.attributes.WGS84_Lat,
                                key: index,
                            });
                        });
                    } else {
                        currentData = 0;
                    }
                    _self.$message({
                        //Element ui的Message组件
                        message: `查询成功，共查到 ${results.features.length} 条数据`,
                        type: 'success',
                    });
                    _self.$store.commit('_setDefaultQueryResult', currentData);
                    _self.$store.commit('_setDefaultQueryResultVisible', true);
                    console.log(currentData);
                })
                .catch(function (error) {
                    console.log(error);
                    _self.$message.error('空间查询失败！');
                });
        },
        async renderResultLayer(resultFeatures) {
            const view = this.$store.getters._getDefaultMapView;
            const [FeatureLayer] = await loadModules(['esri/layers/FeatureLayer'], config.options);

            const resultLayer = view.map.findLayerById('initResultLayer');
            if (resultLayer) view.map.remove(resultLayer);

            const resultData = this._translateLonLat(resultFeatures);

            //实例化弹窗
            let template = {
                title: '{name}-{tieluju}',
                content: [
                    {
                        type: 'fields',
                        fieldInfos: [
                            {
                                fieldName: 'name',
                                label: '名称',
                            },
                            {
                                fieldName: 'type',
                                label: '类型',
                            },
                            {
                                fieldName: 'tieluju',
                                label: '铁路局',
                            },
                            {
                                fieldName: 'address',
                                label: '地址',
                            },
                        ],
                    },
                ],
            };

            const queryResultLayer = new FeatureLayer({
                source: resultData,
                id: 'initResultLayer',
                objectIdField: 'ObjectID',
                renderer: {
                    type: 'simple',
                    symbol: {
                        type: 'picture-marker', // autocasts as new PictureMarkerSymbol()
                        url: `static/icon/train.png`,
                        width: '20px',
                        height: '20px',
                    },
                },
                fields: [
                    {
                        name: 'OBJECTID',
                        type: 'oid',
                    },
                    {
                        name: 'name',
                        type: 'string',
                    },
                    {
                        name: 'type',
                        type: 'string',
                    },
                    {
                        name: 'tieluju',
                        type: 'string',
                    },
                    {
                        name: 'address',
                        type: 'string',
                    },
                ],
                popupTemplate: template,
            });
            view.map.add(queryResultLayer);
        },
        _translateLonLat(data) {
            const _self = this;
            if (data.length > 0) {
                _self.geoData = [];
                data.map((value, key) => {
                    _self.geoData.push({
                        geometry: {
                            type: 'point',
                            x: Number(value.attributes.WGS84_Lng),
                            y: Number(value.attributes.WGS84_Lat),
                        },
                        attributes: {
                            ObjectID: key + 1,
                            name: value.attributes.站名,
                            type: value.attributes.性质,
                            tieluju: value.attributes.铁路局,
                            address: value.attributes.车站地,
                        },
                    });
                });
            }
            return _self.geoData;
        },
        //卷帘分析
        async _initSwipe() {
            const _self = this;
            const view = _self.$store.getters._getDefaultMapView;
            const [Swipe] = await loadModules(['esri/widgets/Swipe'], config.options);
            const topLayer = view.map.findLayerById('swipeLayerTop');
            const bottomLayer = view.map.findLayerById('swipeLayerBottom');
            if (topLayer && bottomLayer) {
                _self.swipe = new Swipe({
                    leadingLayers: [topLayer],
                    trailingLayers: [bottomLayer],
                    position: 50,
                    view: view,
                });
                view.ui.add(_self.swipe);
            } else {
                _self.$message({
                    message: '请添加至少两张业务图层',
                    type: 'warning',
                });
                return;
            }
        },
        async _handlePrintMap() {
            const _self = this;
            const view = _self.$store.getters._getDefaultMapView;
            const [PrintTask, PrintTemplate, PrintParameters] = await loadModules(
                ['esri/tasks/PrintTask', 'esri/tasks/support/PrintTemplate', 'esri/tasks/support/PrintParameters'],
                config.options,
            );

            let printTask = new PrintTask({
                url: 'https://utility.arcgisonline.com/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task',
            });

            let template = new PrintTemplate({
                format: 'pdf',
                exportOptions: {
                    dpi: 96,
                },
                layout: 'a4-portrait',
                layoutOptions: {
                    titleText: 'xxx一张图',
                    authorText: 'lovewhoilove',
                },
            });

            let params = new PrintParameters({
                view: view,
                template: template,
            });

            printTask.execute(params).then((printResult, printError) => {
                console.log(printResult, printError);
                if (printResult.url) window.open(printResult.url);
                if (printError) this.$message.error('地图打印失败');
            });
        },
        openXZQHPannel() {
            let currentVisible = this.$store.getters._getDefaultXZQHVisible;
            this.$store.commit('_setDefaultXZQHVisible', !currentVisible);
        },
        openMaptreePannel() {
            let currentVisible = this.$store.getters._getDefaultMaptreeVisible;
            this.$store.commit('_setDefaultMaptreeVisible', !currentVisible);
        },
    },
};
</script>

<style>
.maptools-view {
    position: absolute;
    padding: 0 15px;
    height: 30px;
    top: 20px;
    right: 15px;
    background-color: #ffffff;
}
.maptools-item {
    line-height: 30px;
    margin-left: 15px;
    color: black;
    cursor: pointer;
    font-size: 15px;
}
.maptools-item:first-child {
    margin-left: 0;
}
.maptools-item:hover {
    color: #409eff;
}
</style>
