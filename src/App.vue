<template>
    <div id="app">
        <el-container class="app-out-container">
            <el-header class="sys-header">
                <a href="/">一张图项目系统</a>
                <div class="user-info">
                    <i class="el-icon-user"></i>
                    <span>当前用户: </span>
                    <span @click="handleUserLogin">{{ username }}</span>
                </div>
            </el-header>
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

        <el-dialog title="用户登录/注册" :visible.sync="loginDialogVisible" width="30%">
            <div class="login-content">
                <div class="login-content-login" v-show="!loginSwitch">
                    <p>用户名：</p>
                    <el-input placeholder="请输入用户名" v-model="usernameLogin" clearable> </el-input>
                    <p>密码：</p>
                    <el-input placeholder="请输入密码" v-model="passwordLogin" clearable show-password></el-input>
                </div>
                <div class="login-content-insert" v-show="loginSwitch">
                    <p>用户名：</p>
                    <el-input placeholder="请输入用户名" v-model="usernameRegister" clearable> </el-input>
                    <p>密码：</p>
                    <el-input placeholder="请输入密码" v-model="passwordRegister" clearable> </el-input>
                    <p>手机号：</p>
                    <el-input placeholder="请输入手机号" v-model="phoneRegister" clearable> </el-input>
                    <p>邮箱：</p>
                    <el-input placeholder="请输入邮箱" v-model="emailRegister" clearable> </el-input>
                </div>
            </div>
            <el-switch v-model="loginSwitch" active-text="注册" inactive-text="登录"> </el-switch>
            <span slot="footer" class="dialog-footer">
                <el-button @click="loginDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="userLogin">{{ loginSwitch ? '注册' : '登录' }}</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import axios from 'axios';
import qs from 'qs';

export default {
    name: 'App',
    components: {},
    data() {
        return {
            username: '未登录',
            loginDialogVisible: false,
            usernameLogin: '',
            passwordLogin: '',
            loginSwitch: false,
            usernameRegister: '',
            passwordRegister: '',
            phoneRegister: '',
            emailRegister: '',
        };
    },
    methods: {
        handleMenuSelect(index) {
            if (index === '1') {
                this.$router.push('/');
            } else if (index === '2') {
                this.$router.push('/onemap');
            }
        },
        //弹出登录界面
        handleUserLogin() {
            this.loginDialogVisible = true;
        },
        //用户登录
        userLogin() {
            const _self = this;
            if (!_self.loginSwitch) {
                //登录
                const name = _self.usernameLogin;
                const pwd = _self.passwordLogin;

                axios
                    .get('http://localhost:3000/user/get', {
                        params: {
                            name,
                        },
                    })
                    .then(function (response) {
                        if (response.data.status === 'success') {
                            _self.$message({
                                message: '恭喜你，登陆成功',
                                type: 'success',
                            });
                            _self.username = response.data.data[0].username;
                            _self.loginDialogVisible = false;
                            const password = response.data.data[0].password;
                            if (password === pwd) {
                                _self.$message({
                                    message: '恭喜你，登陆成功',
                                    type: 'success',
                                });
                                _self.username = response.data.data[0].username;
                                _self.loginDialogVisible = false;
                            } else {
                                _self.$message.error('登录失败，用户名或密码错误');
                            }
                        }
                    })
                    .catch(function (error) {
                        _self.loginDialogVisible = false;
                        console.log(error);
                    });
            } else {
                //注册
                let username = _self.usernameRegister;
                let password = _self.passwordRegister;
                let phone = _self.phoneRegister;
                let email = _self.emailRegister;
                if (!username || !password) {
                    _self.$message({
                        message: '请填写用户名或密码',
                        type: 'warning',
                    });
                    return;
                } else {
                    axios
                        .post(
                            'http://localhost:3000/user/insert',
                            qs.stringify({
                                username,
                                password,
                                phone,
                                email,
                            }),
                        )
                        .then(function (response) {
                            if (response.data.status === 'success') {
                                _self.$message({
                                    message: '用户注册成功，请登录',
                                    type: 'success',
                                });
                            } else {
                                _self.$message.error('用户注册失败');
                            }
                        })
                        .catch(function (error) {
                            _self.loginDialogVisible = false;
                            console.log(error);
                        });
                }
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
    display: flex;
    justify-content: space-between;
}
.sys-header > a {
    text-decoration: none;
    color: #ffffff;
}
.user-info {
    font-size: 15px;
}
.user-info > span:last-child:hover {
    color: #409eff;
    cursor: pointer;
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
