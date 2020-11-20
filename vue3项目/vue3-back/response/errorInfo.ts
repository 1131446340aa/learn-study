
export default {
  repeatUserName: {
    error: 10003,
    message: '用户名未存在'
  },
  // 注册失败
  registerFailInfo: {
    error: 10002,
    message: '注册失败，请重试'
  },
  // 用户名已存在
  registerUserNameExistInfo: {
    error: 10001,
    message: '用户名已存在'
  },
  // 登录失败
  loginFailInfo: {
    error: 10004,
    message: '登录失败，用户名或密码错误'
  },
  // 未登录
  loginCheckFailInfo: {
    error: 10005,
    message: '您尚未登录'
  },
  // 修改密码失败
  changePasswordFailInfo: {
    error: 10006,
    message: '修改密码失败，请重试'
  },
  // 上传文件过大
  uploadFileSizeFailInfo: {
    error: 10007,
    message: '上传文件尺寸过大'
  },
  // 修改基本信息失败
  changeInfoFailInfo: {
    error: 10008,
    message: '修改基本信息失败'
  },
  // json schema 校验失败
  jsonSchemaFileInfo: {
    error: 10009,
    message: '数据格式校验错误'
  },
  // 删除用户失败
  deleteUserFailInfo: {
    error: 10010,
    message: '删除用户失败'
  },
  findLoversFail: {
    error: 10040,
    message: '查询关注者失败'
  },
  // 添加关注失败
  addFollowerFailInfo: {
    error: 10011,
    message: '添加关注失败'
  },
  // 取消关注失败
  deleteFollowerFailInfo: {
    error: 10012,
    message: '取消关注失败'
  },
  addApproveFailInfo: {
    error: 10021,
    message: '添加点赞失败'
  },
  // 取消关注失败
  deleteApproveFailInfo: {
    error: 10022,
    message: '取消点赞失败'
  },
  findApproveFailInfo: {
    error: 10012,
    message: '查询点赞失败'
  },
  // 创建微博失败
  createBlogFailInfo: {
    error: 11001,
    message: '创建博客失败，请重试'
  },
  // 删除微博失败
  deleteBlogFailInfo: {
    error: 11002,
    message: '删除微博失败，请重试'
  },
  findBlogInfo: {
    error: 11003,
    message: '查询微博失败'
  },
  addCountArticle: {
    error: 11004,
    message: '添加文章观看人数失败'
  },
  addCommentFail: {
    error: 11005,
    message: '评论失败'
  },
  getCommitFail: {
    error: 11006,
    message: '获取评论失败'
  },
}