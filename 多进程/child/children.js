/*
 * @Descripttion: 
 * @Date: 2020-07-21 11:28:36
 * @LastEditors: 黄力豪
 * @LastEditTime: 2020-07-24 14:28:47
 */

console.log('hello');


// process.send('123432')
    // process.stdin.write("222\n")
console.log(123);
process.on('message', message => {
    console.log(message);
    process.exit()
})