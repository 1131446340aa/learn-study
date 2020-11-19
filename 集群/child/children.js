/*
 * @Descripttion: 
 * @Date: 2020-07-21 15:06:39
 * @LastEditors: 黄力豪
 * @LastEditTime: 2020-07-21 15:44:54
 */
let app = require('express')()

process.on('message', (data, serve) => {
    console.log(process.pid);
    app.get('/home', (req, res) => {
        setTimeout(() => {
            process.exit(process.pid)
        }, 1000);
        res.send(`${process.pid}`)
    }).listen(serve)

})