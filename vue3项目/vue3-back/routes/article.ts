import { Article, FindArticle, FindAllAriticle, UpdateInfo, ArticleId, UserId } from './../types/interface.ts';
import { Router } from "https://deno.land/x/oak@v6.0.1/mod.ts";

import getCtxBody from '../util/getCtxBody.ts'
import getParams from '../util/getParams.ts'
import {
  publish, getArticleInfo, addComment,
  getCommitByArticleId, updateLove, getAllLoves,
  getAllArticleInfo, updateApprove, updateCollection
} from "../controller/article.ts";
import getUserId from '../util/getSessionuserId.ts'
import getSessionuserId from "../util/getSessionuserId.ts";
const router = new Router()
router.post('/publish', async (ctx) => {
  const { content, artiName, type, isSave } = await getCtxBody(ctx) as Article;
  let userId = await getUserId(ctx)
  ctx.response.body = await publish({ content, artiName, userId, isSave, type })
})
router.get('/findArticleInfo', async (ctx) => {
  const { articleId, targetId } = getParams(ctx) as FindArticle

  let userId = await getSessionuserId(ctx)
  const result = userId ? await getArticleInfo({ articleId, userId, targetId }) : await getArticleInfo({ articleId, targetId });
  ctx.response.body = result
})
router.get('/findAllArticle', async (ctx) => {
  const { type, isNew, limit, offset, keyWord, createdId, collections, approve } = getParams(ctx) as FindAllAriticle

  ctx.response.body = await getAllArticleInfo({ type, isNew, limit, offset, keyWord, createdId, collections, approve })
})

router.post('/updateApprove', async (ctx) => {
  const { isAdd, articleId } = await getCtxBody(ctx) as UpdateInfo

  let userId = await getSessionuserId(ctx)
  const result = await updateApprove({ articleId, isAdd, userId })
  ctx.response.body = result
})
router.post('/updateCollection', async (ctx) => {
  const { isAdd, articleId } = await getCtxBody(ctx) as UpdateInfo

  let userId = await getSessionuserId(ctx)
  console.log(userId);

  const result = await updateCollection({ articleId, isAdd, userId })
  ctx.response.body = result
})
router.post('/addComment', async (ctx) => {
  const { parentId, content, articleId } = await getCtxBody(ctx) as UpdateInfo
  let userId = await getSessionuserId(ctx)
  ctx.response.body = await addComment({ parentId, content, articleId, userId })
})
router.get('/getCommetByArticleId', async (ctx) => {


  const { articleId } = getParams(ctx) as ArticleId
  console.log(await getCommitByArticleId({ articleId }));
  ctx.response.body = await getCommitByArticleId({ articleId })
})
router.post('/updateLove', async (ctx) => {
  const { isAdd, targetId } = await getCtxBody(ctx) as UpdateInfo
  let userId = await getSessionuserId(ctx)
  ctx.response.body = await updateLove({ targetId, isAdd, userId })
})
router.get('/allLoves', async (ctx) => {

  const { userId } = getParams(ctx) as UserId;
  ctx.response.body = await getAllLoves({ userId })
})
export default router