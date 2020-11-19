/*
 * @Descripttion:
 * @Date: 2020-07-18 14:29:31
 * @LastEditors: 黄力豪
 * @LastEditTime: 2020-07-18 15:08:24
 */
const sequelize = require('sequelize')

const STRING = sequelize.STRING

const DECIMAL = sequelize.DECIMAL
const TEXT = sequelize.TEXT
const INTEGER = sequelize.INTEGER
const BOOLEAN = sequelize.BOOLEAN
module.exports = { STRING, DECIMAL, TEXT, INTEGER, BOOLEAN }
