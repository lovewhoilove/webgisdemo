const express = require('express');
const app = express();
var bodyParser = require('body-parser');    //首先要引入这个插件

//引入路由文件
const user = require('./routers/user');
const home = require('./routers/home');

//设置跨域访问
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, No-Cache, X-Requested-With, If-Modified-Since, Pragma, Last-Modified, Cache-Control, Expires, Content-Type, X-E4M-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

app.use(bodyParser.urlencoded({  //配置这两行代码
    extended: true
}));
app.use(bodyParser.json());      //配置这两行代码

app.use('/user', user);
app.use('/', home);

app.listen(3000);