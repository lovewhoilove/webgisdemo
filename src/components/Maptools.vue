<template>
    <div class="maptools-view">
        <span class="maptools-item" @click="handleMaptoolsItemClick" id="xzqh">行政区导航</span>
        <span class="maptools-item" @click="handleMaptoolsItemClick" id="maptree">目录树管理</span>
        <span class="maptools-item" @click="handleMaptoolsItemClick" id="distance">距离测量</span>
        <span class="maptools-item" @click="handleMaptoolsItemClick" id="area">面积测量</span>
        <span class="maptools-item" @click="handleMaptoolsItemClick" id="clear">清屏</span>
    </div>
</template>

<script>
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
                case 'distance':
                    break;
                case 'area':
                    break;
                case 'clear':
                    break;
                default:
                    break;
            }
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
}
.maptools-item:first-child {
    margin-left: 0;
}
</style>
