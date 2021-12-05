<template>
    <div id="app">
        <el-container class="app-out-container">
            <el-header class="sys-header">xxxx项目</el-header>
            <el-container class="app-content-container">
                <el-aside class="sys-menu">左侧菜单</el-aside>
                <el-main class="sys-map">
                    <Mapview />
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import Mapview from './components/Mapview';

export default {
    name: 'App',
    components: {
        Mapview,
    },
};
</script>

<style>
html,
body,
#app {
    position: relative;
    width: 100%;
    height: 100%;
    margin: 0;
}
.app-out-container,
.app-content-container {
    height: 100%;
}
.sys-header {
    background-color: #409eff;
    line-height: 60px;
    color: #ffffff;
    font-size: 20px;
}
.sys-menu {
    width: 200px;
    background-color: #c0c4cc;
}
.sys-map {
    padding: 2px;
}
</style>
