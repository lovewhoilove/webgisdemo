<template>
    <div class="mapview-pannel">
        <div id="mapview"></div>
        <div id="basemap-toggle"></div>
        <div id="scalebar"></div>
        <div id="zoom"></div>
        <div class="view-change" @click="handleViewChange">
            <span>{{ viewModelText }}</span>
        </div>
    </div>
</template>

<script>
import { loadModules } from 'esri-loader';
import config from './config';

export default {
    name: 'Mapview',
    components: {},
    data() {
        return {
            viewModelText: '3D',
        };
    },
    mounted: function () {
        this._createMapView();
    },
    methods: {
        //创建地图
        async _createMapView() {
            document.getElementById('basemap-toggle').innerHTML = '';
            document.getElementById('scalebar').innerHTML = '';
            document.getElementById('zoom').innerHTML = '';

            const [Map, MapView, Basemap, TileLayer, BasemapToggle, ScaleBar, Zoom] = await loadModules(
                [
                    'esri/Map',
                    'esri/views/MapView',
                    'esri/Basemap',
                    'esri/layers/TileLayer',
                    'esri/widgets/BasemapToggle',
                    'esri/widgets/ScaleBar',
                    'esri/widgets/Zoom',
                ],
                config.options,
            );

            const basemap = new Basemap({
                baseLayers: [
                    new TileLayer({
                        url: 'https://map.geoq.cn/arcgis/rest/services/ChinaOnlineStreetPurplishBlue/MapServer',
                        title: 'Basemap',
                    }),
                ],
                title: 'basemap',
            });

            const map = new Map({
                basemap,
            });

            const mapView = new MapView({
                container: 'mapview',
                map: map,
                zoom: 10,
                center: [104.072044, 30.663776],
            });

            mapView.ui.components = [];

            //底图切换控件
            const nextBasemap = new Basemap({
                baseLayers: [
                    new TileLayer({
                        url: 'https://map.geoq.cn/arcgis/rest/services/ChinaOnlineStreetWarm/MapServer',
                        title: 'Basemap',
                    }),
                ],
                title: 'nextBasemap',
            });

            const basemapToggle = new BasemapToggle({
                view: mapView,
                nextBasemap: nextBasemap,
                container: 'basemap-toggle',
            });

            mapView.ui.add(basemapToggle);

            //比例尺控件
            let scaleBar = new ScaleBar({
                view: mapView,
                container: 'scalebar',
                unit: 'metric',
                style: 'line',
            });

            mapView.ui.add(scaleBar);

            //缩放控件
            let zoom = new Zoom({
                view: mapView,
                container: 'zoom',
            });

            mapView.ui.add(zoom);

            this.$store.commit('_setDefaultMapView', mapView);
        },
        async _createSceneView() {
            document.getElementById('basemap-toggle').innerHTML = '';
            document.getElementById('scalebar').innerHTML = '';
            document.getElementById('zoom').innerHTML = '';

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
                container: 'mapview',
                map: map,
            });

            setTimeout(() => {
                sceneView.goTo({
                    zoom: 10,
                    center: [104.072745, 30.663774],
                });
            }, 3000);

            sceneView.ui.components = [];
            this.$store.commit('_setDefaultMapView', sceneView);
        },
        //二三维切换
        handleViewChange() {
            if (this.viewModelText === '3D') {
                this._createSceneView();
                this.viewModelText = '2D';
            } else {
                this._createMapView();
                this.viewModelText = '3D';
            }
        },
    },
};
</script>

<style>
.mapview-pannel,
#mapview {
    position: relative;
    width: 100%;
    height: 100%;
}
#basemap-toggle {
    position: absolute;
    bottom: 15px;
    right: 15px;
}
#scalebar {
    position: absolute;
    left: 15px;
    bottom: 15px;
}
#zoom {
    position: absolute;
    bottom: 100px;
    right: 15px;
}
.view-change {
    position: absolute;
    width: 32px;
    height: 32px;
    right: 15px;
    bottom: 180px;
    background-color: #fff;
    cursor: pointer;
    text-align: center;
}
.view-change span {
    line-height: 32px;
}
</style>
