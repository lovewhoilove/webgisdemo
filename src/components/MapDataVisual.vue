<template>
    <div class="map-data-visual-view">
        <div id="sceneview"></div>
        <div id="echarts01"></div>
    </div>
</template>

<script>
import { loadModules } from 'esri-loader';
import config from './config';
import * as echarts from 'echarts';

export default {
    name: 'MapDataVisual',
    components: {},
    data() {
        return {};
    },
    mounted() {
        this.initMap();
        this.initEcharts01();
    },
    methods: {
        //实例化三维地图
        async initMap() {
            const [Map, SceneView, Basemap, TileLayer] = await loadModules(
                ['esri/Map', 'esri/views/SceneView', 'esri/Basemap', 'esri/layers/TileLayer'],
                config.options,
            );

            let basemap = new Basemap({
                baseLayers: [
                    new TileLayer({
                        url: 'https://map.geoq.cn/arcgis/rest/services/ChinaOnlineStreetPurplishBlue/MapServer',
                        title: 'Basemap',
                    }),
                ],
                title: 'basemap',
                id: 'basemap',
            });

            const map = new Map({
                basemap,
            });

            const sceneView = new SceneView({
                container: 'sceneview',
                map: map,
            });

            sceneView.ui.components = [];
        },
        //实例化图表
        initEcharts01() {
            // 基于准备好的dom，初始化echarts实例
            const myChart = echarts.init(document.getElementById('echarts01'), 'dark');
            // 绘制图表
            myChart.setOption({
                title: {
                    text: 'ECharts 入门示例',
                },
                tooltip: {},
                xAxis: {
                    data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
                },
                yAxis: {},
                series: [
                    {
                        name: '销量',
                        type: 'bar',
                        label: {
                            show: true,
                        },
                        itemStyle: {
                            color: '#409EFF',
                        },
                        data: [5, 20, 36, 10, 10, 20],
                    },
                ],
            });
        },
    },
};
</script>

<style>
.map-data-visual-view {
    position: relative;
    width: 100%;
    height: 100%;
}
#sceneview {
    width: 100%;
    height: 100%;
}

#echarts01 {
    position: absolute;
    width: 300px;
    height: 200px;
    top: 20px;
    left: 15px;
}
</style>
