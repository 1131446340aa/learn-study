import { Article, UpdateInfo, FindAllAriticle, ArticleId, UserId } from "../types/interface.ts";
import { FindOne, Count } from "../util/processMysql.ts";
import client from "../database/index.ts";

export async function createArticle({ content, artiName, userId, isSave, type }: Article) {
  let sql = `insert into articles ( content, artiName, userId, isSave, type ) values ('${content}', '${artiName}', '${userId}', '${isSave}', '${type}')`
  return (await client.execute(sql)).affectedRows
}

export const getArticle = async ({ articleId, userId, targetId }: UpdateInfo) => {

  await client.execute(`update articles as article set article.sawCount = article.sawCount+1 `)
  let sql = `select article.artiName, article.type, article.sawCount, article.content, article.userId, article.id, article.createdAt, article.updatedAt,user.userName, user.nickName, user.picture, user.work from articles as article left outer join users as user on article.userId = user.id where article.id = ${articleId} and isSave = '1'`
  let res = (await client.execute(sql)).rows
  let result = res && res[0]
  result.ApproveCount = await Count('approve', `where artiId = ${articleId}`)
  result.CollectionCount = await Count('collection', `where artiId = ${articleId}`)
  result.AllapproveCount = await Count('approve', `where userId in (select userId from articles where userId=${targetId})`)
  let sum = (await client.execute(`select sawCount from articles as article where article.userId = ${targetId}`)).rows as any[]

  let allCount = 0
  for (let arti of sum) {
    allCount += arti.sawCount
  }
  result.allCount = allCount
  if (userId) {
    let isApprove = Boolean(await FindOne('approve', `where artiId = ${articleId} and userId = ${userId}`))
    let isCollection = Boolean(await FindOne('collection', `where artiId = ${articleId} and userId = ${userId}`))
    let isLove = Boolean(await FindOne('love', `where targetId = ${targetId} and userId = ${userId}`))
    result.isApprove = isApprove
    result.isCollection = isCollection
    result.isLove = isLove
  }
  
  return result
}
export const getAllArticle = async ({ type, isNew, limit, offset, keyWord, createdId, collections, approve }: FindAllAriticle) => {
  let sql =`select article.artiName, article.type, article.sawCount, article.content, article.userId, article.id, article.createdAt, article.updatedAt,user.userName, user.nickName, user.picture, user.work from articles as article left outer join users as user on article.userId = user.id `
  let where = ``
  let order =`order by `
  if (type) { where += where ? `and type = "${type}"` : `where type = '${type}' ` }
  if (keyWord) {
     where += where ? `and content like '%${keyWord}%' ` : `where content like'%${keyWord}%' ` 
  }
  if (createdId && !collections && !approve) {
    where =`where article.userId = "${createdId}" `
  }
  if ( createdId &&approve) {
    where = `where article.id in (select artiId from approves where userId = ${createdId}) `
  }
  if (createdId && collections) {
    where = `where article.id in (select artiId from collections where userId = ${createdId}) `
  }
  if (isNew === "1") {
    order+=`article.updatedAt desc `
  } else {
    order += `article.sawCount desc `
  }
  sql = `${sql}${where}${order} limit ${offset}, ${limit}`
  let result = (await client.execute(sql)).rows as any[];
  let allCount=0
  if (type) {
    let res = (await client.execute(`select count(*) as count from articles where type = '${type}'`)).rows
    allCount = res && res[0].count
  } else {
    let res = (await client.execute(`select count(*) as count from articles`)).rows
    allCount = res && res[0].count
  }
  
  for (let item of result ) { 
    item.approveCount = await Count('approve',`where artiId = ${item.id}`)
    item.CollectionCount = await Count('collection',`where artiId = ${item.id}`)
    item.commentCount = await Count('commet',`where artiId = ${item.id}`)
  }
  
 return {result,allCount}
}
export async function postUpdateApprove({ articleId, isAdd, userId }: UpdateInfo) {
  let sql = ``
  let isExist = await FindOne('approve', `where artiId = ${articleId} and userId = ${userId}`)
  if (isAdd && !isExist) {
    sql = `insert into approves (artiId,userId) values ('${articleId}','${userId}')`
  }
  else if (!isAdd && isExist) {
    sql = `delete from approves where artiId = ${articleId} and userId = ${userId}`
  }
  else {
    throw new Error()
  }
  return await client.execute(sql)
}
export async function postUpdateCollection({ articleId, isAdd, userId }: UpdateInfo) {

  let sql = ``
  let isExist = await FindOne('collection', `where artiId = ${articleId} and userId = ${userId}`) 
  if (isAdd && !isExist) {
    sql = `insert into collections (artiId,userId) values ('${articleId}','${userId}')`
  }
  else if (!isAdd && isExist) {
    sql = `delete from collections where artiId = ${articleId} and userId = ${userId}`
  }
  else {   
    throw new Error()
  }
  return await client.execute(sql)
}
export async function postAddComment({ parentId, content, articleId, userId }: UpdateInfo) {
  let sql = `insert into commets ( parentId, content, artiId, userId ) values ('${parentId}', '${content}', '${articleId}', '${userId}')`
  return (await client.execute(sql)).affectedRows
}
export async function getAllCommit({ articleId }: ArticleId) {
  let sql = `select commet.artiId, commet.content, commet.id, commet.parentId, commet.userId, commet.createdAt, commet.updatedAt, user.userName, user.nickName, user.picture, user.work from commets as commet left outer join users as user on user.id = commet.userId where commet.artiId = ${articleId}`
  return (await client.execute(sql)).rows
}
export async function postUpdateLove({ targetId, isAdd, userId }: UpdateInfo) {
  let sql = ``
  let isExist = await FindOne('love', `where targetId = ${targetId} and userId = ${userId}`)
  if (isAdd && !isExist) {
    sql = `insert into loves (targetId,userId) values ('${targetId}','${userId}')`
  }
  else if (!isAdd && isExist) {
    sql = `delete from loves where targetId = ${targetId} and userId = ${userId}`
  }
  else {
    throw new Error()
  }
  return await client.execute(sql)
}
export async function AllLoves({ userId }: UserId) {
  let sql = `select * from users as user where user.id in (select love.targetId from loves as love where love.userId = '${userId}')`
  return (await client.execute(sql)).rows

}
