<template>
    <div class="maptree-pannel" v-show="this.$store.getters._getDefaultMaptreeVisible">
        <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
    </div>
</template>

<script>
import { loadModules } from 'esri-loader';

const options = {
    //定义一个包含有JS API中js开发包和css样式文件的对象
    url: 'http://localhost/4.21/init.js',
    css: 'http://localhost/4.21/esri/themes/light/main.css',
};

export default {
    name: 'Maptree',
    data() {
        return {
            data: [
                {
                    label: '暖色系图层',
                    layerid: 'layerid',
                    layerurl: 'https://map.geoq.cn/arcgis/rest/services/ChinaOnlineStreetWarm/MapServer',
                    children: [
                        {
                            label: '二级 1-1',
                            children: [
                                {
                                    label: '三级 1-1-1',
                                },
                            ],
                        },
                    ],
                },
                {
                    label: '一级 2',
                    children: [
                        {
                            label: '二级 2-1',
                            children: [
                                {
                                    label: '灰色系图层',
                                    layerid: 'layerid',
                                    layerurl:
                                        'https://map.geoq.cn/arcgis/rest/services/ChinaOnlineStreetGray/MapServer',
                                },
                            ],
                        },
                        {
                            label: '二级 2-2',
                            children: [
                                {
                                    label: '三级 2-2-1',
                                },
                            ],
                        },
                    ],
                },
                {
                    label: '一级 3',
                    children: [
                        {
                            label: '二级 3-1',
                            children: [
                                {
                                    label: '三级 3-1-1',
                                },
                            ],
                        },
                        {
                            label: '二级 3-2',
                            children: [
                                {
                                    label: '三级 3-2-1',
                                },
                            ],
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
                const view = this.$store.getters._getDefaultMapView;
                const resultLayer = view.map.findLayerById('layerid');
                if (resultLayer) view.map.remove(resultLayer);
                const [TileLayer] = await loadModules(['esri/layers/TileLayer'], options);
                const layer = new TileLayer({
                    url: data.layerurl,
                    id: data.layerid,
                });
                view.map.add(layer);
            }
        },
    },
};
</script>

<style>
.maptree-pannel {
    position: absolute;
    top: 20px;
    left: 15px;
    padding: 8px 8px 8px 4px;
    background-color: #ffffff;
}
</style>
