/*
 * @Descripttion: 
 * @Date: 2020-07-18 15:01:14
 * @LastEditors: 黄力豪
 * @LastEditTime: 2020-07-19 22:03:05
 */
// @ts-ignore
const Koa = require('koa')
const app = new Koa()
// @ts-ignore
const views = require('koa-views')
// @ts-ignore
const json = require('koa-json')
// @ts-ignore
const onerror = require('koa-onerror')
// @ts-ignore
const bodyparser = require('koa-bodyparser')
// @ts-ignore
const logger = require('koa-logger')
// @ts-ignore
var cors = require('koa2-cors');
// @ts-ignore
const index = require('./routes/index')
// @ts-ignore
const users = require('./routes/users')
// @ts-ignore
const articles = require('./routes/article')
// @ts-ignore
const KoaSession = require('koa-generic-session')
    // error handler
onerror(app)
app.use(cors({
            origin: ['http://localhost:3000'], // 允许这个域名的 跨域请求
            exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
            maxAge: 5,
            credentials: true,
            allowMethods: ['GET', 'POST', 'DELETE'],
            allowHeaders: ['Content-Type', 'Authorization', 'Accept']
        }

    ))
    // middlewares
    // app.use(ctx=>{ctx.vary})
app.use(bodyparser({
    enableTypes: ['json', 'form', 'text']
}))

app.use(json())
app.use(logger())
// @ts-ignore
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
        extension: 'ejs'
    }))
    // app.use(cors)
    // logger
// @ts-ignore
app.use(async(ctx, next) => {
    const start = new Date()
    await next()
    // @ts-ignore
    const ms = new Date() - start
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})
app.keys = ['vsvsef464654*/-*bafyfbyfbew']

app.use(KoaSession({
        key: 'weibo.sid',
        prefix: 'weibo:sess',
        cookie: {
            path: '/',
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        },

    }))
    // routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(articles.routes(), articles.allowedMethods())
// error-handling
// @ts-ignore
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
});

module.exports = app