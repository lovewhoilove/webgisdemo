const express = require('express');
const pg = require('pg');

const router = express.Router();

const pgConfig = 'postgres://postgres:webgis@localhost:5432/webgis';

router.get('/get', function (req, res) {
    let name = req.query.name;
    const client = new pg.Client(pgConfig);
    client.connect(function (isErr) {
        if (isErr) {
            console.log('连接错误: ' + isErr.message);
            client.end();
            return;
        }
        client.query('SELECT * FROM "user" WHERE username = $1', [name], function (isErr, results) {
            if (isErr) {
                console.log('查询错误: ' + isErr.message);
                res.send({
                    status: 'fail',
                    message: '查询错误',
                });
            } else {
                console.log('查询成功' + results.rows);
                console.table(results.rows);
                res.send({
                    status: 'success',
                    data: results.rows,
                });
            }
            client.end();
        });
    });
});

//用户注册接口
router.post('/insert', function (req, res) {
    let name = req.body.username;
    let pwd = req.body.password;
    let phone = req.body.phone;
    let email = req.body.email;

    const client = new pg.Client(pgConfig);
    client.connect(function (isErr) {
        if (isErr) {
            console.log('connect error:' + isErr.message);
            client.end();
            return;
        }
        client.query('INSERT INTO "user" (username, password, phone, email) VALUES ($1, $2, $3, $4);', [name, pwd, phone, email], function (isErr, rst) {
            if (isErr) {
                console.log('query error:' + isErr.message);
                res.send({
                    status: 'fail',
                    msg: 'insert error'
                });
            } else {
                console.log('insert success, data is: ' + rst);
                res.send({
                    status: 'success',
                    data: []
                });
            }
            client.end();
        });
    });
});

module.exports = router;