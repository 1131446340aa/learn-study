/*
 * @Descripttion: 
 * @Date: 2020-07-21 15:01:45
 * @LastEditors: 黄力豪
 * @LastEditTime: 2020-07-21 15:51:16
 */
// let app = require('express')()
// let os = require('os')
// let path = require('path')
// let { fork } = require('child_process')
// let { isWorker } = require('cluster')
// app.get('/', (req, res) => {
//     res.send("q2")
// })
// let server = app.listen(8086)

// os.cpus().forEach(() => {
//     let child = fork('children.js', [], {
//         cwd: path.resolve(__dirname, './child'),
//         detached: true
//     })
//     child.on('exit', () => {
//         child.send('server', server)
//     })
//     child.send('server', server)
// })

const cluster = require("cluster");
const http = require("http");
const os = require("os");

// 判断当前执行的进程是否为主进程，为主进程则创建子进程，否则用子进程监听服务
if (cluster.isMaster) {
    // 创建子进程
    os.cpus().forEach(() => cluster.fork());
} else {
    // 创建并监听服务
    let app = http.createServer((req, res) => {
        res.end(`child${process.pid}`);
    })
    app.listen(3010);
    // process.exit(process.pid)

}
cluster.on('exit', () => {
    cluster.fork()
})