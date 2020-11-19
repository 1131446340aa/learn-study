const Sequelize = require('sequelize');
// console.log(Sequelize.Op.like);
const { Arti, isApprove, isCollection, Commet, love } = require("../module/arti/index");
const { User } = require("../module/user/User");
async function createArticle({ content, artiName, userId, isSave, type }) {
  const result = await Arti.create({
    content, artiName, userId, isSave, type
  });
  return result.dataValues;
}
const seq = require('../module/seq')
const getArticle = async ({ articleId, userId, targetId }) => {
  const result = {}
  const arti = await Arti.findOne({
    where: {
      id: articleId
    }
  });
  await arti.increment('sawCount', { silent: true })
  result.articleInfo = await Arti.findOne({
    attribute: ['artiName', 'type', 'sawCount', 'content',
      'userId', 'id',
      'createdAt', 'updatedAt'
    ],
    include: [
      {
        model: User,
        attributes: ['nickName', 'picture','city']
      }
    ],
    where: { id: articleId, isSave: 1 }
  })

  result.articleInfo.dataValues.isApproveCount = await isApprove.count({
    where: {
      artiId: articleId
    }
  })

  result.articleInfo.dataValues.isCollectionCount = await isCollection.count({
    where: {
      artiId: articleId
    }
  })
  result.articleInfo.dataValues.AllapproveCount = await isApprove.count({

    where: { userId: [seq.literal(`select userId from articles where id=${articleId}`),] }
  })
  let sum = await Arti.findAll({
    attribute: 'sawCount',
    where: { userId: [seq.literal(`select userId from articles where id=${articleId}`),] }
  })
  let AllCount = 0
  for (let arti of sum) {
    AllCount += arti.sawCount
  }
  result.articleInfo.dataValues.AllCount = AllCount
  if (userId) {
    let approve = await isApprove.findOne({
      attribute: ['artiId'
      ],
      where: { artiId: articleId, userId }
    })
    let Collection = await isCollection.findOne({
      attribute: ['artiId'
      ],
      where: { artiId: articleId, userId }
    })
    let isLove = await love.findOne({
      attribute: ['targetId'
      ],
      where: { targetId, userId }
    })
    result.articleInfo.dataValues.isApprove = approve ? true : false
    result.articleInfo.dataValues.Collection = Collection ? true : false
    result.articleInfo.dataValues.love = isLove ? true : false
  }
  // console.log(result);
  return result
}
const getAllArticle = async ({ type, isNew, limit, offset, keyWord, createdId, collections,approve }) => {
  let result
  let order
  order = isNew != '0' ? "updatedAt" : "sawCount";
  let options = {
    attribute: ['artiName', 'type', 'sawCount', 'content',
      'userId', 'id',
      'createdAt', 'updatedAt',
    ],
    include: [
      {
        model: User,
        attributes: ['nickName', 'picture', 'id','city','userName']
      }
    ],
    order: [
      [order, "DESC"]
    ],
    limit: ~~limit,
    offset: ~~offset,
  }
  options.where = {}
  if (type) {
    options.where.type = type
  }
  if (createdId) {
    options.where.userId = createdId
  }
  if (collections) {
    options.where = { id: [seq.literal(`select artiId from collections where userId=${createdId}`),] }
  }
  if (approve) {
    options.where = { id: [seq.literal(`select artiId from approves where userId=${createdId}`),] }
  }
  if (keyWord) {
    options.where.content = { [Sequelize.Op.like]: `%${keyWord}%` }
  }
  result = await Arti.findAndCountAll(options);

  for (let item of result.rows) {
    let wehereOptions = {
      where: {
        artiId: item.dataValues.id
      }
    }
    item.dataValues.approveCount = await isApprove.count(wehereOptions)
    item.dataValues.CollectionCount = await isCollection.count(wehereOptions)
    item.dataValues.commentCount = await Commet.count(wehereOptions)
  }

  return result
}
async function postUpdateApprove({ articleId, isAdd, userId }) {
  let resuld
  let options = {
    where: {
      artiId: articleId,
      userId
    }
  }
  let ixExist = await isApprove.findOne(options)
  result = isAdd && !ixExist ? await isApprove.create(options.where) : await isApprove.destroy(options.where);
  return resuld
}
async function postUpdateCollection({ articleId, isAdd, userId }) {
  let resuld
  let options = {
    where: {
      artiId: articleId,
      userId
    }
  }
  let ixExist = await isCollection.findOne(options)
  result = isAdd && !ixExist ? await isCollection.create(options.where) : await isCollection.destroy(options);
  return resuld
}
async function postAddComment({ parentId, content, articleId, userId }) {
  let result = await Commet.create({ parentId, content, artiId: articleId, userId })
  return result

}
async function getAllCommit({ articleId }) {
  let result = await Commet.findAndCountAll({
    attribute: ['artiId', 'content', 'id', 'parentId', 'userId', 'createdAt', 'updatedAt'],
    where: {
      artiId: articleId
    },
    include: [
      {
        model: User,
        attributes: ['nickName', 'picture','city','userName']
      }
    ]
  })

  return result

}
async function postUpdateLove({ targetId, isAdd, userId }) {
  let resuld
  let options = {
    where: {
      targetId,
      userId
    }
  }
  let ixExist = await love.findOne(options)
  result = isAdd && !ixExist ? await love.create(options.where) : await love.destroy(options);
  return resuld
}
async function AllLoves({ userId }) {
  let result = await love.findAndCountAll({
    attribute: ['id', 'targetid', 'userId', 'createdAt', 'updatedAt'],
    where: {
      userId: userId
    }
  })
  for (let i = 0; i < result.rows.length;i++){
    result.rows[i].dataValues.user = await User.findOne({
      attribute: ['nickName', 'picture'],
      where: {
        id: result.rows[i].dataValues.targetId
      }
    }) 
  }

  return result

}
module.exports = {
  createArticle, getArticle,
  getAllArticle, postUpdateApprove,
  postUpdateCollection, postAddComment,
  getAllCommit, postUpdateLove, AllLoves
};