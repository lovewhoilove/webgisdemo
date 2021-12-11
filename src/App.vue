<template>
    <div id="app">
        <el-container class="app-out-container">
            <el-header class="sys-header">一张图项目系统</el-header>
            <el-container class="app-content-container">
                <el-aside class="sys-menu">
                    <el-menu
                        default-active="1"
                        class="el-menu-vertical-demo"
                        background-color="#545c64"
                        text-color="#ffffff"
                        active-text-color="#ffd04b"
                        @select="handleMenuSelect"
                        :collapse="true"
                    >
                        <el-menu-item index="1">
                            <i class="el-icon-monitor"></i>
                            <span slot="title">首页大屏</span>
                        </el-menu-item>
                        <el-menu-item index="2">
                            <i class="el-icon-picture-outline"></i>
                            <span slot="title">一张图</span>
                        </el-menu-item>
                    </el-menu>
                </el-aside>
                <el-main class="sys-map">
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
export default {
    name: 'App',
    components: {},
    methods: {
        handleMenuSelect(index) {
            if (index === '1') {
                this.$router.push('/');
            } else if (index === '2') {
                this.$router.push('/onemap');
            }
        },
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
    background-color: #32373e;
    line-height: 60px;
    color: #ffffff;
    font-weight: 600;
    font-size: 20px;
}
.sys-menu {
    background-color: #545c64;
    width: 64px !important;
    overflow: hidden;
}
.sys-map {
    padding: 1px;
}
</style>
