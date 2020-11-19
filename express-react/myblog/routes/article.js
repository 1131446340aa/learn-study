const router = require("koa-router")();
const { publish, getArticleInfo, addComment,
  getCommitByArticleId, updateLove, getAllLoves,
  getAllArticleInfo, updateApprove, updateCollection } = require('../controller/article')
const { loginCheckFailInfo } = require('../modules/ErrorInfo')
const { SuccessfulModel, ErrorModel } = require('../modules/ResModule')
router.post('/publish', async (ctx, next) => {
  const content = ctx.request.body.content
  const artiName = ctx.request.body.artiName
  const type = ctx.request.body.type
  let isSave = ctx.request.body.isSave

  let body = {}
  let userId
  if (ctx.session.userinfo) {
    userId = ctx.session.userinfo.data.id
    body = await publish({ content, artiName, userId, isSave, type })
  } else {
    body = new ErrorModel(loginCheckFailInfo)
  }
  ctx.body = body
})
router.get('/findArticleInfo', async (ctx, next) => {
  const { articleId, targetId } = ctx.request.query
  let result = null
  let userId
  if (ctx.session.userinfo) {
    userId = ctx.session.userinfo.data.id
    result = await getArticleInfo({ articleId, userId, targetId})
  } else {
    result = await getArticleInfo({ articleId })
  }
  ctx.body = result
})
router.get('/findAllArticle', async (ctx, next) => {
  const { type, isNew, limit, offset, keyWord, createdId, collections, approve } = ctx.request.query
  let result = null
 
  result = await getAllArticleInfo({ type, isNew, limit, offset, keyWord, createdId, collections, approve})
  
  ctx.body = result
})

router.post('/updateApprove', async (ctx, next) => {
  const isAdd = ctx.request.body.isAdd
  let articleId = ctx.request.body.articleId
  let result = null
  let userId = ctx.session && ctx.session.userinfo && ctx.session.userinfo.data.id
  result = await updateApprove({ articleId, isAdd ,userId})
  ctx.body = result
})
router.post('/updateCollection', async (ctx, next) => {
  const isAdd = ctx.request.body.isAdd
  let articleId = ctx.request.body.articleId
  let result = null
  let userId = ctx.session && ctx.session.userinfo && ctx.session.userinfo.data.id
  result = await updateCollection({ articleId, isAdd, userId })
  ctx.body = result
})
router.post('/addComment', async (ctx, next) => {
  const { parentId, content, articleId } = ctx.request.body
  let userId = ctx.session && ctx.session.userinfo && ctx.session.userinfo.data.id
  result = await addComment({ parentId, content, articleId , userId })
  ctx.body=result
})
router.get('/getCommitByArticleId', async (ctx, next) => {
  const {  articleId } = ctx.request.query
 let result = await getCommitByArticleId({ articleId})
  ctx.body = result
})
router.post('/updateLove', async (ctx, next) => {
  const isAdd = ctx.request.body.isAdd
  let targetId = ctx.request.body.targetId
  let result = null
  let userId = ctx.session && ctx.session.userinfo && ctx.session.userinfo.data.id
  result = await updateLove({ targetId, isAdd, userId })
  ctx.body = result
})
router.get('/allLoves', async (ctx) => {
  const { userId } = ctx.request.query
  result = await getAllLoves({ userId })
  ctx.body = result
})
module.exports = router;