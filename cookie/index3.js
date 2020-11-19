/*
 * @Date: 2020-07-13 18:41:08
 * @LastEditors: 黄力豪
 * @LastEditTime: 2020-07-13 19:21:40
 * @FilePath: /learn/cookie/index3.js
 */

const axios = require('axios')

// axios.get('http://localhost:8002/login').then(res => {
//     console.log(res);
// })

axios('http://localhost:8002/login').then(res => {
    console.log(1);
})