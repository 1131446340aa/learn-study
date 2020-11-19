/*
 * @Descripttion: 
 * @Date: 2020-07-18 16:20:51
 * @LastEditors: 黄力豪
 * @LastEditTime: 2020-07-19 21:01:09
 */
module.exports = {
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
        errno: 10007,
        message: '上传文件尺寸过大'
    },
    // 修改基本信息失败
    changeInfoFailInfo: {
        errno: 10008,
        message: '修改基本信息失败'
    },
    // json schema 校验失败
    jsonSchemaFileInfo: {
        errno: 10009,
        message: '数据格式校验错误'
    },
    // 删除用户失败
    deleteUserFailInfo: {
        errno: 10010,
        message: '删除用户失败'
    },
    findLoversFail: {
        errno: 10040,
        message: '查询关注者失败'
    },
    // 添加关注失败
    addFollowerFailInfo: {
        errno: 10011,
        message: '添加关注失败'
    },
    // 取消关注失败
    deleteFollowerFailInfo: {
        errno: 10012,
        message: '取消关注失败'
    },
    addApproveFailInfo: {
        errno: 10021,
        message: '添加点赞失败'
    },
    // 取消关注失败
    deleteApproveFailInfo: {
        errno: 10022,
        message: '取消点赞失败'
    },
    findApproveFailInfo: {
        errno: 10012,
        message: '查询点赞失败'
    },
    // 创建微博失败
    createBlogFailInfo: {
        errno: 11001,
        message: '创建微博失败，请重试'
    },
    // 删除微博失败
    deleteBlogFailInfo: {
        errno: 11002,
        message: '删除微博失败，请重试'
    },
    findBlogInfo: {
        errno: 11003,
        message: '查询微博失败'
    },
    addCountArticle: {
        errno: 11004,
        message: '添加文章观看人数失败'
    },
    addCommentFail: {
        errno: 11005,
        message: '评论失败'
    },
    getCommitFail: {
        errno: 11006,
        message: '获取评论失败'
    },
}