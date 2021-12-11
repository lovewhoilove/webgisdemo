<template>
    <div class="morescreen-view">
        <div class="morescreen-top-view">
            <div id="top-left" class="map-item"></div>
            <div id="top-right" class="map-item"></div>
        </div>
        <div class="morescreen-bottom-view">
            <div id="bottom-left" class="map-item"></div>
            <div id="bottom-right" class="map-item"></div>
        </div>
    </div>
</template>

<script>
import { loadModules } from 'esri-loader';
import config from './config';

export default {
    name: 'MoreScreen',
    mounted: function () {
        this._initMap();
    },
    methods: {
        async _initMap() {
            const [Map, MapView, Basemap, TileLayer, watchUtils] = await loadModules(
                ['esri/Map', 'esri/views/MapView', 'esri/Basemap', 'esri/layers/TileLayer', 'esri/core/watchUtils'],
                config.options,
            );
            const basemap = new Basemap({
                baseLayers: [
                    new TileLayer({
                        url: 'http://map.geoq.cn/arcgis/rest/services/ChinaOnlineStreetPurplishBlue/MapServer',
                        title: 'Basemap',
                    }),
                ],
                title: 'basemap',
                id: 'basemap',
            });
            const map01 = new Map({
                basemap,
            });
            const mapView01 = new MapView({
                container: 'top-left',
                map: map01,
                zoom: 10,
                center: [104.072745, 30.663774],
            });
            const map02 = new Map({
                basemap,
            });
            const mapView02 = new MapView({
                container: 'top-right',
                map: map02,
                zoom: 10,
                center: [104.072745, 30.663774],
            });
            const map03 = new Map({
                basemap,
            });
            const mapView03 = new MapView({
                container: 'bottom-left',
                map: map03,
                zoom: 10,
                center: [104.072745, 30.663774],
            });
            const map04 = new Map({
                basemap,
            });
            const mapView04 = new MapView({
                container: 'bottom-right',
                map: map04,
                zoom: 10,
                center: [104.072745, 30.663774],
            });
            mapView01.ui.components = [];
            mapView02.ui.components = [];
            mapView03.ui.components = [];
            mapView04.ui.components = [];

            let flag1 = true,
                flag2 = true,
                flag3 = true,
                flag4 = true;

            //地图联动：仅当视图处于静止状态(即stationary)时，才获取视图的新中心。
            watchUtils.whenTrue(mapView01, 'stationary', function () {
                if (flag1) {
                    flag2 = false;
                    flag3 = false;
                    flag4 = false;
                    if (mapView01.center) {
                        mapView02.goTo({
                            center: [mapView01.center.longitude, mapView01.center.latitude],
                            zoom: mapView01.zoom,
                        });
                        mapView03.goTo({
                            center: [mapView01.center.longitude, mapView01.center.latitude],
                            zoom: mapView01.zoom,
                        });
                        mapView04.goTo({
                            center: [mapView01.center.longitude, mapView01.center.latitude],
                            zoom: mapView01.zoom,
                        });
                    }
                } else if (!flag1) {
                    flag1 = true;
                }
            });

            watchUtils.whenTrue(mapView02, 'stationary', function () {
                if (flag2) {
                    flag1 = false;
                    flag3 = false;
                    flag4 = false;
                    if (mapView02.center) {
                        mapView01.goTo({
                            center: [mapView02.center.longitude, mapView02.center.latitude],
                            zoom: mapView02.zoom,
                        });
                        mapView03.goTo({
                            center: [mapView02.center.longitude, mapView02.center.latitude],
                            zoom: mapView02.zoom,
                        });
                        mapView04.goTo({
                            center: [mapView02.center.longitude, mapView02.center.latitude],
                            zoom: mapView02.zoom,
                        });
                    }
                } else if (!flag2) {
                    flag2 = true;
                }
            });

            watchUtils.whenTrue(mapView03, 'stationary', function () {
                if (flag3) {
                    flag1 = false;
                    flag2 = false;
                    flag4 = false;
                    if (mapView03.center) {
                        mapView01.goTo({
                            center: [mapView03.center.longitude, mapView03.center.latitude],
                            zoom: mapView03.zoom,
                        });
                        mapView02.goTo({
                            center: [mapView03.center.longitude, mapView03.center.latitude],
                            zoom: mapView03.zoom,
                        });
                        mapView04.goTo({
                            center: [mapView03.center.longitude, mapView03.center.latitude],
                            zoom: mapView03.zoom,
                        });
                    }
                } else if (!flag3) {
                    flag3 = true;
                }
            });

            watchUtils.whenTrue(mapView04, 'stationary', function () {
                if (flag4) {
                    flag1 = false;
                    flag2 = false;
                    flag3 = false;
                    if (mapView04.center) {
                        mapView01.goTo({
                            center: [mapView04.center.longitude, mapView04.center.latitude],
                            zoom: mapView04.zoom,
                        });
                        mapView02.goTo({
                            center: [mapView04.center.longitude, mapView04.center.latitude],
                            zoom: mapView04.zoom,
                        });
                        mapView03.goTo({
                            center: [mapView04.center.longitude, mapView04.center.latitude],
                            zoom: mapView04.zoom,
                        });
                    }
                } else if (!flag4) {
                    flag4 = true;
                }
            });
        },
    },
};
</script>

<style>
.morescreen-view {
    width: 100%;
    height: 100%;
}
.map-item {
    width: calc(50% - 2.5px);
    height: 100%;
    border: 1px solid #dcdfe6;
    box-sizing: border-box;
}
.morescreen-top-view {
    width: 100%;
    height: calc(50% - 2.5px);
    display: flex;
    justify-content: space-between;
    margin-bottom: 2.5px;
}
.morescreen-bottom-view {
    width: 100%;
    height: calc(50% - 2.5px);
    display: flex;
    justify-content: space-between;
    margin-top: 2.5px;
}
#top-left {
    margin-right: 2.5px;
}
#top-right {
    margin-left: 2.5px;
}
#bottom-left {
    margin-right: 2.5px;
}
#bottom-right {
    margin-left: 2.5px;
}
</style>
