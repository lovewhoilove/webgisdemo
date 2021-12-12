const express = require('express');
const app = express();

const user = require('./routers/user');//引入路由文件
app.use('/user', user);

const home = require('./routers/home');
app.use('/', home);

app.listen(3000);