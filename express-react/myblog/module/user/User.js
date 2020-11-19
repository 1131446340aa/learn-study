/*
 * @Descripttion: 
 * @Date: 2020-07-18 14:25:13
 * @LastEditors: 黄力豪
 * @LastEditTime: 2020-07-19 20:04:21
 */
const seq = require("../seq");
// const sequelize = require('sequelize')
const { STRING, DECIMAL, INTEGER } = require("../type.js");

const User = seq.define("user", {
    userName: {
        type: STRING,
        allowNull: false,
        unique: true,
        comment: "用户名"
    },
    password: {
        type: STRING,
        allowNull: false,
        comment: "密码"
    },
    nickName: {
        type: STRING,
        allowNull: false,
        comment: "昵称"
    },
    question: {
        type: STRING,
        allowNull: false,
        comment: "密保"
    },
    answer: {
        type: STRING,
        allowNull: false,
        comment: "答案"
    },
    work: {
        type: STRING,
        allowNull: true,
        comment: "工作"
    },
    desc: {
        type: STRING,
        allowNull: true,
        comment: "描述"
    },
    gender: {
        type: DECIMAL,
        allowNull: false,
        defaultValue: 3,
        comment: "性别(1 男性, 2 女性, 3保密)"
    },
    picture: {
        type: STRING,
        allowNull: true,
        defaultValue: 'https://user-gold-cdn.xitu.io/2020/1/3/16f6a569ea434fdc?imageView2/1/w/100/h/100/q/85/format/webp/interlace/1',
        comment: "头像"
    },
    city: {
        type: STRING,
        allowNull: true,
        comment: "城市"
    },
    id: {
        type: INTEGER,
        primaryKey: true, // 主键
        autoIncrement: true // 自动递增
    }
});
// const { Blog, User } = require ('./module.js')
// !(async() => {
//     const zhangsan = await User.create({
//         userName: "15079482422",
//         nickName: "zhangsan",
//         password: "113144",
//         question: "zhangsan",
//         answer: "113144"
//     });
//     // const lisi =await User.create({
//     //     userName:'1131446340',
//     //     nickName:'lisi',
//     //     passWord:'113144'
//     // })

//     // const blog1 = await Blog.create({
//     //     title:'标题1',
//     //     content:'内容1',
//     //     userId:8
//     // })
// })();
module.exports = { User };