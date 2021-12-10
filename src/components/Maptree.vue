<template>
    <div class="maptree-pannel" v-show="this.$store.getters._getDefaultMaptreeVisible">
        <div class="maptree-header">
            <span>图层管理</span>
            <i class="el-icon-close" @click="closeMapTreePannel"></i>
        </div>
        <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
    </div>
</template>

<script>
import { loadModules } from 'esri-loader';
import config from './config';

export default {
    name: 'Maptree',
    data() {
        return {
            data: [
                {
                    label: '底图数据',
                    children: [
                        {
                            label: '暖色系图层',
                            layerid: 'layerid',
                            layerurl: 'https://map.geoq.cn/arcgis/rest/services/ChinaOnlineStreetWarm/MapServer',
                        },
                        {
                            label: '灰色系图层',
                            layerid: 'layerid',
                            layerurl: 'https://map.geoq.cn/arcgis/rest/services/ChinaOnlineStreetGray/MapServer',
                        },
                    ],
                },
                {
                    label: '行政区划数据',
                    children: [
                        {
                            label: '省数据',
                            layerid: 'layerid',
                            layerurl:
                                'https://services3.arcgis.com/U26uBjSD32d7xvm2/arcgis/rest/services/province_mercator/FeatureServer',
                        },
                        {
                            label: '市数据',
                            layerid: 'layerid',
                            layerurl:
                                'https://services3.arcgis.com/U26uBjSD32d7xvm2/arcgis/rest/services/city_mercator/FeatureServer',
                        },
                        {
                            label: '县数据',
                            layerid: 'layerid',
                            layerurl:
                                'https://services3.arcgis.com/U26uBjSD32d7xvm2/arcgis/rest/services/county_mercator/FeatureServer',
                        },
                    ],
                },
                {
                    label: '业务数据',
                    children: [
                        {
                            label: '火车站数据',
                            layerid: 'layerid',
                            layerurl:
                                'https://services3.arcgis.com/U26uBjSD32d7xvm2/arcgis/rest/services/trainstation/FeatureServer',
                        },
                    ],
                },
            ],
            defaultProps: {
                children: 'children',
                label: 'label',
            },
        };
    },
    methods: {
        async handleNodeClick(data) {
            // console.log(data);
            if (data.layerurl) {
                //在加载新图层之前删除已添加的图层
                const view = this.$store.getters._getDefaultMapView;
                const resultLayer = view.map.findLayerById('layerid');
                if (resultLayer) view.map.remove(resultLayer);

                //处理不同类型服务
                const [TileLayer, FeatureLayer] = await loadModules(
                    ['esri/layers/TileLayer', 'esri/layers/FeatureLayer'],
                    config.options,
                );
                const c = data.layerurl.split('/');
                const serverType = c[c.length - 1];
                let layer = '';
                switch (serverType) {
                    case 'MapServer':
                        layer = new TileLayer({ url: data.layerurl, id: data.layerid });
                        break;
                    case 'FeatureServer':
                        layer = new FeatureLayer({ url: data.layerurl, id: data.layerid });
                        break;
                    default:
                        break;
                }
                view.map.add(layer);
            }
        },
        closeMapTreePannel() {
            const currentVisible = this.$store.getters._getDefaultMaptreeVisible;
            this.$store.commit('_setDefaultMaptreeVisible', !currentVisible);
        },
    },
};
</script>

<style>
.maptree-pannel {
    position: absolute;
    top: 20px;
    left: 15px;
    width: 200px;
    height: 300px;
    background-color: #ffffff;
    border-radius: 6px;
}
.maptree-header {
    width: 100%;
    height: 35px;
    border-bottom: 1px solid #e4e7ed;
    padding: 0 5px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
}
.maptree-header > span {
    line-height: 35px;
    font-size: 16px;
    font-weight: 600;
}
.maptree-header > i {
    line-height: 35px;
    cursor: pointer;
}
</style>
