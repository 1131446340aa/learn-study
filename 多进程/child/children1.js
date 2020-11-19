/*
 * @Descripttion: 
 * @Date: 2020-07-21 12:02:54
 * @LastEditors: 黄力豪
 * @LastEditTime: 2020-07-21 14:07:20
 */
let fs = require('fs')
process.stdout.on('data', data => {
    fs.writeFile('param.txt', data, () => {
        process.exit()
    })
})