const express = require('express');
var pg = require('pg');

const router = express.Router();

const pgConfig = 'postgres://postgres:webgis@localhost:5432/webgis';

router.get('/get', function (req, res) {
    const client = new pg.Client(pgConfig);
    client.connect(function (isErr) {
        if (isErr) {
            console.log('连接错误: ' + isErr.message);
            client.end();
            return;
        }
        client.query('SELECT * FROM "user" WHERE username = $1', ['张三'], function (isErr, results) {
            if (isErr) {
                console.log('查询错误: ' + isErr.message);
                res.send({
                    status: 'fail',
                    message: '查询错误',
                });
            } else {
                console.log('查询成功');
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

router.post('/insert', function (req, res) {
    const client = new pg.Client(pgConfig);
    client.connect(function (isErr) {
        if (isErr) {
            console.log('连接错误: ' + isErr.message);
            client.end();
            return;
        }
        client.query('INSERT INTO "user" VALUES ($1,$2,$3,$4);',
            ['李四', 'webgis', '13456789201', '120114@qq.com'],
            function (isErr, results) {
                if (isErr) {
                    console.log('插入错误: ' + isErr.message);
                    res.send({
                        status: 'fail',
                        message: '插入错误',
                    });
                } else {
                    console.log('插入成功' + results);
                    res.send({
                        status: 'success',
                        data: [],
                    });
                }
                client.end();
            });
    });
});

module.exports = router;