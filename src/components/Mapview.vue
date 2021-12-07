<template>
    <div id="mapview"></div>
</template>

<script>
import { loadModules } from 'esri-loader';

const options = {
    //定义一个包含有JS API中js开发包和css样式文件的对象
    // url: 'https://js.arcgis.com/4.21/init.js',
    // css: 'https://js.arcgis.com/4.21/esri/themes/light/main.css',
    url: 'http://localhost/4.21/init.js',
    css: 'http://localhost/4.21/esri/themes/light/main.css',
};

export default {
    name: 'Mapview',
    components: {},
    mounted: function () {
        this._createMapView();
        console.log(this.$store.state._defaultThemeColor);
    },
    methods: {
        //创建地图
        async _createMapView() {
            const [Map, MapView] = await loadModules(['esri/Map', 'esri/views/MapView'], options);

            const map = new Map({
                basemap: 'osm',
            });

            const view = new MapView({
                container: 'mapview',
                map: map,
                zoom: 10,
                center: [104.072044, 30.663776],
            });

            view.ui.components = [];
        },
    },
};
</script>

<style>
#mapview {
    position: relative;
    width: 100%;
    height: 100%;
}
</style>
