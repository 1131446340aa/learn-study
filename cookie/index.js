/*
 * @Date: 2020-07-13 15:19:14
 * @LastEditors: 黄力豪
 * @LastEditTime: 2020-07-14 10:25:01
 * @FilePath: /learn/cookie/index.js
 */

let app = require('express')()

app.get('/login', async(req, res) => {
    res.cookie('age11', '18', {
        // httpOnly: true,
        // sameSite: 'strict',
        path: '/login'
    })
    res.send('123')
})

app.get('/register', async(req, res) => {

    res.send({
        cookie: req.cookies
    })
})
app.listen('8001', () => {
    console.log('start');
})