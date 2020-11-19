const { createArticle, getArticle, postAddComment, getAllArticle, AllLoves,
  postUpdateApprove, postUpdateCollection, getAllCommit, postUpdateLove} = require('../services/article')
const { SuccessfulModel, ErrorModel } = require('../modules/ResModule')
const {  loginCheckFailInfo,
  findBlogInfo, addApproveFailInfo,
  deleteApproveFailInfo, findLoversFail,
  addCommentFail, getCommitFail,
  addFollowerFailInfo, deleteFollowerFailInfo } = require("../modules/ErrorInfo");
async function publish({ content, artiName, userId, isSave, type }) {
  try {
    await createArticle({ content, artiName, userId, isSave, type });
    return new SuccessfulModel();

  } catch (e) {
    console.error(e.message, e.stack);
    return new ErrorModel(loginCheckFailInfo);
  }
}
async function getArticleInfo({ articleId, userId, targetId }) {
  try {
    let res = userId ? await getArticle({ articleId, userId, targetId }) :
      await getArticle({ articleId })
    return new SuccessfulModel(res);

  } catch (e) {
    console.error(e.message, e.stack);
    return new ErrorModel(findBlogInfo);
  }
}
async function getAllArticleInfo({ type, isNew, limit, offset, keyWord, createdId, collections, approve }) {
  try {
   
    let res = await getAllArticle({ type, isNew, limit, offset, keyWord, createdId, collections, approve})
    return new SuccessfulModel(res);
  } catch (e) {
    console.error(e.message, e.stack);
    return new ErrorModel(findBlogInfo);
  }
}
async function updateApprove({ articleId, isAdd, userId }) {

  try {
    let res = await postUpdateApprove({ articleId, isAdd, userId })
    return new SuccessfulModel(res);
  } catch (e) {
    console.error(e.message, e.stack);
    if (!userId) {
      return new ErrorModel(loginCheckFailInfo)
    }
    if (isAdd) { return new ErrorModel(addApproveFailInfo) }
    if (!isAdd) { return new ErrorModel(deleteApproveFailInfo); }

  }
}
async function updateCollection({ articleId, isAdd, userId }) {

  try {
    let res = await postUpdateCollection({ articleId, isAdd, userId })
    return new SuccessfulModel(res);
  } catch (e) {
    console.error(e.message, e.stack);
    if (!userId) {
      return new ErrorModel(loginCheckFailInfo)
    }
    if (isAdd) { return new ErrorModel(addFollowerFailInfo) }
    if (!isAdd) { return new ErrorModel(deleteFollowerFailInfo); }

  }
}
async function addComment({ parentId, content, articleId, userId }) {

  try {
    let res = await postAddComment({ parentId, content, articleId, userId})
    return new SuccessfulModel(res);
  } catch (e) {
    console.error(e.message, e.stack);
    if (!userId) {
      return new ErrorModel(loginCheckFailInfo)
    }
    return new ErrorModel(addCommentFail); 

  }
}
async function getCommitByArticleId({articleId }) {

  try {
    let res = await getAllCommit({ articleId })
    return new SuccessfulModel(res);
  } catch (e) {
    
    return new ErrorModel(getCommitFail);

  }
}
async function updateLove({ targetId, isAdd, userId }) {

  try {
    let res = await postUpdateLove({ targetId, isAdd, userId })
    return new SuccessfulModel(res);
  } catch (e) {
    console.error(e.message, e.stack);
    if (!userId) {
      return new ErrorModel(loginCheckFailInfo)
    }
    if (isAdd) { return new ErrorModel(addFollowerFailInfo) }
    if (!isAdd) { return new ErrorModel(deleteFollowerFailInfo); }

  }
}

async function getAllLoves({ userId}) {
  try {

    let res = await AllLoves({userId})
    return new SuccessfulModel(res);
  } catch (e) {
    console.error(e.message, e.stack);
    return new ErrorModel(findLoversFail);
  }
}
module.exports = {
  publish, getArticleInfo, getAllArticleInfo,
  updateApprove, updateCollection, updateLove,
  addComment, getCommitByArticleId, getAllLoves
}