<template>
    <div class="mapview-pannel">
        <div id="mapview"></div>
        <div id="basemap-toggle"></div>
        <div id="scalebar"></div>
        <div id="zoom"></div>
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
    name: 'Mapview',
    components: {},
    mounted: function () {
        this._createMapView();
    },
    methods: {
        //创建地图
        async _createMapView() {
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
                options,
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
</style>
