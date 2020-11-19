const seq = require("../seq");
// const sequelize = require('sequelize')
const { STRING, DECIMAL, INTEGER ,TEXT} = require("../type.js");
const { User} = require ('../user/User')
const Arti = seq.define("article", {
  artiName: {
    type: STRING,
    allowNull: true,
    comment: "文章名"
  },
  type: {
    type: STRING,
    allowNull: false,
    comment: "类型"
  },
  isSave: {
    type: DECIMAL,
    allowNull: false,
    defaultValue: 0,
    comment: "是否是草稿(0 草稿, 1 发布)"
  },
  sawCount: {
    type: INTEGER,
    allowNull: false,
    defaultValue: 0,
    comment: "文章看的人数"
  },
  content: {
    type: TEXT,
    allowNull: false,
    comment: "内容"
  },
  userId: {
    type: INTEGER,
    primaryKey: false, // 主键
    // autoIncrement: true // 自动递增
  },
  id: {
    type: INTEGER,
    primaryKey: true, // 主键
    autoIncrement: true // 自动递增
  },

});
Arti.belongsTo(User, { foreignKey: 'userId' })
const isApprove = seq.define("approve", {
  artiId: {
    type: INTEGER,
    primaryKey: false, // 主键
    // autoIncrement: true // 自动递增
  },
  userId: {
    type: INTEGER,
    primaryKey: false, // 主键
    // autoIncrement: true // 自动递增
  },
  id: {
    type: INTEGER,
    primaryKey: true, // 主键
    autoIncrement: true // 自动递增
  },

});
isApprove.belongsTo(Arti, {
  foreignKey:'artiId'
})
isApprove.belongsTo(User, {
  foreignKey: 'userId'
})
const isCollection = seq.define("collection", {
  artiId: {
    type: INTEGER,
    primaryKey: false, // 主键
    // autoIncrement: true // 自动递增
  },
  userId: {
    type: INTEGER,
    primaryKey: false, // 主键
    // autoIncrement: true // 自动递增
  },
  id: {
    type: INTEGER,
    primaryKey: true, // 主键
    autoIncrement: true // 自动递增
  },

});
isCollection.belongsTo(Arti, {
  foreignKey: 'artiId'
})
isCollection.belongsTo(User, {
  foreignKey: 'userId'
})
const Commet = seq.define("commet", {
  artiId: {
    type: INTEGER,
    primaryKey: false, // 主键
    // autoIncrement: true // 自动递增
  },
  content: {
    type: TEXT,
    allowNull: false,
    comment: "内容"
  },
  id: {
    type: INTEGER,
    primaryKey: true, // 主键
    autoIncrement: true // 自动递增
  },
  parentId: {
    type: INTEGER,
    primaryKey: false, // 主键
  },
  userId: {
    type: INTEGER,
    primaryKey: false, // 主键
  }


});
Commet.belongsTo(Arti, {
  foreignKey: 'artiId'
})
Commet.belongsTo(User, {
  foreignKey: 'userId'
})

const love = seq.define("love", {
  
  userId: {
    type: INTEGER,
    primaryKey: false, // 主键
    // autoIncrement: true // 自动递增
  },
  id: {
    type: INTEGER,
    primaryKey: true, // 主键
    autoIncrement: true // 自动递增
  },
  targetId: {
    type: INTEGER,
    primaryKey: false, // 主键
    // autoIncrement: true // 自动递增
  },


});
love.belongsTo(User, {
  foreignKey: 'targetId'
})
love.belongsTo(User, {
  foreignKey: 'userId'
})
module.exports = { Arti, isApprove, isCollection, Commet,love };