/*
 * @Date: 2020-07-08 15:07:34
 * @LastEditors: 黄力豪
 * @LastEditTime: 2020-07-08 15:16:20
 * @FilePath: /grid/index.js
 */

let wk = new WeakMap()

let a = {}
wk.set(a, '123')
wk.set(a, '213123')
    //  WSH.GetObject(a)
    // a = null
console.log(wk.get(a));

let ws = new WeakSet()

ws.add(a)
a = null
console.log(ws.has(a));