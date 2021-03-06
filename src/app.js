const Koa = require('koa')
const app = new Koa()
// const initStorage = require('./modules/storage')
const hbs = require('koa-hbs')
const rootRouter = require('./routes')
const bodyParser = require('koa-bodyparser')

const port = process.env.PORT || 4000

app.use(bodyParser())

// access log
app.use(async (ctx, next) => {
    const date = new Date().toLocaleString()
    const body = ctx.method.toLowerCase() === 'get' ? ctx.querystring : JSON.stringify(ctx.request.body)

    console.log(`[${date}]:::${ctx.method}:::${ctx.url}:::${body}`)

    await next()
})

// init view engine
app.use(
    hbs.middleware({
        viewPath: `${__dirname}/views`
    })
)

// router entry
app.use(rootRouter.routes())
app.use(rootRouter.allowedMethods())

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
