<template>
    <div class="maptools-view">
        <span class="maptools-item" @click="handleMaptoolsItemClick">行政区导航</span>
        <span class="maptools-item" @click="handleMaptoolsItemClick">目录树管理</span>
        <span class="maptools-item" @click="handleMaptoolsItemClick">距离测量</span>
        <span class="maptools-item" @click="handleMaptoolsItemClick">面积测量</span>
        <span class="maptools-item" @click="handleMaptoolsItemClick">清屏</span>
    </div>
</template>

<script>
export default {
    name: 'Maptools',
    methods: {
        handleMaptoolsItemClick(e) {
            console.log(e.target.innerText);
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