/*
 * @Descripttion: 
 * @Date: 2020-07-15 17:04:12
 * @LastEditors: 黄力豪
 * @LastEditTime: 2020-07-18 15:15:11
 */

// 统一连接数据库的方法
const Sequelize = require('sequelize')

const conf = {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 3000
    }
}


const seq = new Sequelize('test', 'root', '113144hao', conf)


// seq
//     .authenticate()
//     .then(() => {
//         console.log('Connection has been established successfully.')
//     })
//     .catch(err => {
//         console.log('Unable to connect to the database', err)
//     })
// seq
//     .sync()
//     .then(() => {
//         console.log('init db ok')
//     })
//     .catch(err => {
//         console.log('init db error', err)
//     })
// const UserModel = seq.define('user', {
//   id: {
//     type: Sequelize.INTEGER(11),
//     primaryKey: true,            // 主键
//     autoIncrement: true,         // 自动递增
//   },

module.exports = seq