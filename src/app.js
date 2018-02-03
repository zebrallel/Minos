const Koa = require('koa')
const app = new Koa()
const convert = require('koa-convert')
const initStorage = require('./modules/storage')
const hbs = require('koa-hbs')

const port = process.env.PORT || 4000

// init storage service
app.AV = initStorage()

// access log
app.use(async (ctx, next) => {
    const date = new Date().toLocaleString()

    console.log(`[${date}]:::${ctx.method}:::${ctx.url}:::${ctx.querystring}`)

    await next()
})

// init view engine
app.use(
    hbs.middleware({
        viewPath: `${__dirname}/views`
    })
)

// final router
app.use(async ctx => {
    switch (ctx.method.toLowerCase()) {
        case 'get':
            await ctx.render('pages/404')
            break
        case 'post':
            ctx.body = { code: -1, message: 'request path can not match!' }
            break
    }
})

app.listen(port, '127.0.0.1', null, () => {
    console.log(`Server is running on ${port}`)
})

//TODO
// 1. logs
