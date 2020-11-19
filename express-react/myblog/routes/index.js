/*
 * @Descripttion: 
 * @Date: 2020-07-18 15:01:14
 * @LastEditors: 黄力豪
 * @LastEditTime: 2020-07-19 21:19:11
 */
const router = require('koa-router')()

router.get('/', async(ctx, next) => {
    await ctx.render('index', {
        title: 'Hello Koa 2!'
    })
})

router.get('/string', async(ctx, next) => {
    ctx.body = 'koa2 string'
})

router.get('/json', async(ctx, next) => {
    ctx.body = {
        title: 'koa2 json'
    }
})

module.exports = router