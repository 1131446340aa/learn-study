/*
 * @Descripttion: 
 * @Date: 2020-07-21 11:22:25
 * @LastEditors: 黄力豪
 * @LastEditTime: 2020-07-24 14:39:07
 */

let { spawn, fork } = require('child_process')
let { promisify } = require('util')
const path = require("path")
    // let x = "world"
    let child = spawn('node', ['children.js'], {
        cwd: path.join(__dirname, 'child'),
        stdio: ['pipe']
    })
    // let child1 = spawn('node', ['children1.js'], {
    //     cwd: path.join(__dirname, 'child'),
    //     stdio: ['pipe']
    // })
    // let child2 = spawn('node', ['children3.js'], {
    //     cwd: path.join(__dirname, 'child'),
    //     stdio: 'ignore',
    //     detached: true
    // })
    // child2.unref()
    // child.on('error', error => {
    //     console.log(error + 4);
    // })
    // child.on('exit', (exit) => {
    //     console.log(exit + 3);
    // })

// child.on('close', (close) => {
//     console.log(close + 2);
// })
child.on('message', message => {
    console.log(123);
    console.log(message + 1);

})

child.stdout.on('data', (data) => {
    console.log(data.toString());
    // child1.stdout.write(data.toString())
})

// let child = fork('children.js', [], {
//     cwd: path.join(__dirname, 'child'),
//     silend: true
// })
// child.send('121312312')