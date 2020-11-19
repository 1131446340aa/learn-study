/*
 * @Descripttion: 
 * @Date: 2020-07-18 15:32:59
 * @LastEditors: 黄力豪
 * @LastEditTime: 2020-07-19 21:18:37
 */

const { registerFailInfo, changeInfoFailInfo } = require("../modules/ErrorInfo");
const { SuccessfulModel, ErrorModel } = require("../modules/ResModule");
const { createUser, getUserInfo, updateUser } = require("../services/user");
async function register({ userName, password, question, answer, nickName }) {
    const userInfo = await getUserInfo(userName)
    if (userInfo) {
        return new ErrorModel(registerUserNameExistInfo);
    } else {
        try {
            await createUser({ userName, password, question, answer, nickName });
            return new SuccessfulModel();
            // return { a: 3 }
        } catch (e) {
            console.error(e.message, e.stack);
            return new ErrorModel({ ...registerFailInfo });
        }
    }
}
async function login({ userName, password }) {
    try {
        let res = await getUserInfo({ userName, password });
        return res ? new SuccessfulModel(res.dataValues) : new ErrorModel();
    } catch (e) {
        console.error(e.message, e.stack);

    }
}
async function updateUserInfo({ nickName, picture, password, work, desc,id }) {

    try {
        let res = await updateUser({ nickName, picture, password, work, desc ,id});
        return res ? new SuccessfulModel(res) : new ErrorModel({ ...changeInfoFailInfo });
    } catch (e) {
        console.error(e.message, e.stack);
    }
}

module.exports = { register, login, updateUserInfo };