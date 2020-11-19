/*
 * @Descripttion: 
 * @Date: 2020-07-18 15:01:14
 * @LastEditors: 黄力豪
 * @LastEditTime: 2020-07-19 23:25:24
 */
const router = require("koa-router")();
const { register, login, updateUserInfo } = require("../controller/user");
const { SuccessfulModel, ErrorModel } = require('../modules/ResModule')
const { loginCheckFailInfo } = require('../modules/ErrorInfo');
const { getUserInfo } = require("../services/user");
router.post("/register", async (ctx) => {
    const { userName, nickName, password, question, answer } = ctx.request.body;
    ctx.body = await register({ userName, nickName, password, question, answer });
});
router.post("/login", async (ctx) => {
    // const { userName, password } = ctx.request.body;
    const userName = ctx.request.body.user
    const password = ctx.request.body.pass
    // console.log(ctx.request.body);
    let userinfo = await login({ userName, password });
    if (userinfo && userinfo.error == 0) {
        ctx.session.userinfo = userinfo
    }
    ctx.body = userinfo

});
router.get("/getUserinfo", async (ctx) => {
    let userinfo = {}
    userinfo = ctx.session.userinfo ? new SuccessfulModel(
        ctx.session.userinfo.data
    ) : new ErrorModel(loginCheckFailInfo);
    ctx.body = userinfo
});
router.get("/getOtherUserInfo", async (ctx) => {
    let userName = ctx.request.query.userName
    let result = await getUserInfo({ userName})
    ctx.body = result
});
router.post("/exit", async (ctx) => {
    let userinfo = {}
    if (ctx.session.userinfo) {
        ctx.session.userinfo = ""
    }
    ctx.body = new ErrorModel(loginCheckFailInfo)
});
router.post("/updateInfo", async (ctx) => {
    const { nickName, picture, password, work, desc } = ctx.request.body;
    let result
    if (ctx.session.userinfo) {
        let id = ctx.session.userinfo.data.userName
        result = await updateUserInfo({ nickName, picture, password, work, desc, id })
        ctx.session.userinfo = result
    } else {
        return new ErrorModel(loginCheckFailInfo)
    }
    ctx.body = result
});
module.exports = router;