/*
 * @Date: 2020-07-13 15:36:58
 * @LastEditors: 黄力豪
 * @LastEditTime: 2020-07-14 10:46:50
 * @FilePath: /learn/cookie/index1.js
 */
var express = require('express');
var cookie = require('cookie-parser');
var app = express();


app.use(cookie());

app.get('/test/test2', function(req, res) {

    if (req.cookies.user2) {
        console.log(req.cookies);
        res.send('欢迎在次登录')
    } else {
        res.cookie('user2', 1, { httpOnly: true });
        res.send('欢迎新用户登录')
    }
});

app.listen(8888);