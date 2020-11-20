import { getUserInfo } from './../services/user.ts';
import { Router } from "https://deno.land/x/oak@v6.0.1/mod.ts";
import getCtxBody from '../util/getCtxBody.ts'
import getParams from '../util/getParams.ts'
import { register, login, updateUserInfo } from "../controller/user.ts";
import { SuccessfulModel, ErrorModel } from "../response/resModel.ts";
import ErrorInfo from "../response/errorInfo.ts";
import { UserInfo } from "../types/interface.ts";
import getSessionuserId from '../util/getSessionuserId.ts';
import getSessionUsername from '../util/getSessionUsername.ts';
const { loginCheckFailInfo } = ErrorInfo
const router = new Router()
router.post("/register", async (ctx) => {
  const { userName, nickName, password, question, answer } = await getCtxBody(ctx) as UserInfo;
  ctx.response.body = await register({ userName, nickName, password, question, answer });
});
router.post("/login", async (ctx) => {
  const { userName, password } = await getCtxBody(ctx) as UserInfo;
  let userinfo = await login({ userName, password });
  if (userinfo && userinfo.error == 0 && await ctx.state.session?.get('blog') === undefined) {
    ctx.state.session?.set('blog', userinfo)
  }
  ctx.response.body = userinfo
});

router.get("/getUserinfo", async (ctx) => {
  let { userName, password } = getParams(ctx) as UserInfo;
  let result: ErrorModel | SuccessfulModel
  if (!userName) {
    userName = await getSessionUsername(ctx) as string
  }
  if (!userName) {
    result = new ErrorModel(loginCheckFailInfo)
  }
  else {
    result = new SuccessfulModel(await getUserInfo({ userName, password }))
  }
  ctx.response.body = result
});
router.post("/exit", async (ctx) => {
  ctx.state.session?.set('blog', undefined)
  ctx.response.body = new SuccessfulModel()
});
router.post("/updateInfo", async (ctx) => {
  const { nickName, picture, password, work, desc } = await getCtxBody(ctx) as UserInfo;
  let userId = await getSessionuserId(ctx)
  let userName = await getSessionUsername(ctx)
  if (userId) {
    await updateUserInfo({ nickName, picture, password, work, desc, userId })
    let res = await getUserInfo({ userName }) as any[]
    ctx.state.session.set('blog', new SuccessfulModel(res))
  }
  ctx.response.body = (userId && new SuccessfulModel()) || new ErrorModel(loginCheckFailInfo)
});

export default router