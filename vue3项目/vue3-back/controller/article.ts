import {
  createArticle, getArticle, postAddComment, getAllArticle, AllLoves,
  postUpdateApprove, postUpdateCollection, getAllCommit, postUpdateLove
} from '../services/article.ts'
import { SuccessfulModel, ErrorModel } from '../response/resModel.ts'
import ErrorInfo from '../response/errorInfo.ts';
import { Article, UpdateInfo, FindAllAriticle, ArticleId, UserId } from '../types/interface.ts';
const { loginCheckFailInfo,
  findBlogInfo, addApproveFailInfo,
  deleteApproveFailInfo, findLoversFail,
  addCommentFail, getCommitFail,createBlogFailInfo,
  addFollowerFailInfo, deleteFollowerFailInfo } = ErrorInfo
export async function publish({ content, artiName, userId, isSave, type }: Article) {
  try {
  let res=  await createArticle({ content, artiName, userId, isSave, type });
    return res ?new SuccessfulModel() : new ErrorModel(createBlogFailInfo);

  } catch (e) {
    console.error(e.message, e.stack);
    return new ErrorModel(loginCheckFailInfo);
  }
}
export async function getArticleInfo({ articleId, userId, targetId }: UpdateInfo) {
  try {
    let res = userId ? await getArticle({ articleId, userId, targetId }) :
      await getArticle({ articleId,targetId })
    return new SuccessfulModel(res);

  } catch (e) {
    console.error(e.message, e.stack);
    return new ErrorModel(findBlogInfo);
  }
}
export async function getAllArticleInfo({ type, isNew, limit, offset, keyWord, createdId, collections, approve }: FindAllAriticle) {
  try {

    let res = await getAllArticle({ type, isNew, limit, offset, keyWord, createdId, collections, approve })
    return new SuccessfulModel(res);
  } catch (e) {
    console.error(e.message, e.stack);
    return new ErrorModel(findBlogInfo);
  }
}
export async function updateApprove({ articleId, isAdd, userId }: UpdateInfo) {

  try {
    let res = await postUpdateApprove({ articleId, isAdd, userId })
    return new SuccessfulModel(res);
  } catch (e) {
    console.error(e.message, e.stack);
    return !userId ? new ErrorModel(loginCheckFailInfo) : isAdd ? new ErrorModel(addApproveFailInfo) : new ErrorModel(deleteApproveFailInfo);
  }
}
export async function updateCollection({ articleId, isAdd, userId }: UpdateInfo) {

  try {
    if (!userId) {
      return new ErrorModel(loginCheckFailInfo) 
    }
    let res = await postUpdateCollection({ articleId, isAdd, userId })
    return new SuccessfulModel(res);
  } catch (e) {
    console.error(e.message, e.stack);
    return isAdd ? new ErrorModel(addFollowerFailInfo) : new ErrorModel(deleteFollowerFailInfo);
  }
}
export async function addComment({ parentId, content, articleId, userId }: UpdateInfo) {

  try {
    let res = await postAddComment({ parentId, content, articleId, userId })
    return res ? new SuccessfulModel() : new ErrorModel(addCommentFail);
  } catch (e) {
    console.error(e.message, e.stack);
    return !userId ? new ErrorModel(loginCheckFailInfo) : new ErrorModel(addCommentFail);
  }
}
export async function getCommitByArticleId({ articleId }: ArticleId) {

  try {
    let res = await getAllCommit({ articleId })  
    return new SuccessfulModel(res);
  } catch (e) {
    console.log(e.message);
    
    return new ErrorModel(getCommitFail);

  }
}
export async function updateLove({ targetId, isAdd, userId }: UpdateInfo) {

  try {
    let res = await postUpdateLove({ targetId, isAdd, userId })
    return new SuccessfulModel(res);
  } catch (e) {
    console.error(e.message, e.stack);
    return !userId ? new ErrorModel(loginCheckFailInfo) : isAdd ? new ErrorModel(addFollowerFailInfo) : new ErrorModel(deleteFollowerFailInfo);
  }
}

export async function getAllLoves({ userId }: UserId) {
  try {
    if (!userId) {
      return new ErrorModel(findLoversFail);
    }
    let res = await AllLoves({ userId })
    return new SuccessfulModel(res);
  } catch (e) {
    console.error(e.message, e.stack);
    return new ErrorModel(findLoversFail);
  }
}