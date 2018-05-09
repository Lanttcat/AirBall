/**
 * @file 创建Koa实例，use必要的组件
 * @author lanyixing@live.com
 */

const Koa = require('koa');
const route = require('./server.js');
const bodyParser = require('koa-bodyparser');
const jwtErrorHandle = require('./middlewares/jwtErrorHandle.js');
// const jsonwebtoken = require('jsonwebtoken');

// 引入验证
const jwt = require('koa-jwt');

const secret = 'oneStep_secret';

let app = new Koa();

async function authToken(ctx, next) {
    console.log(ctx.request.header);
    await next();
}

// 加入必要的插件
app.use(bodyParser())
    .use(jwtErrorHandle)
    .use(jwt({
        secret: 'oneStep_secret'
    })
    .unless({
        path: [/\/login/, '/', /.js$/, /.png$/, /.jpg$/, /.woff2$/, /.tff$/, /.json$/, '/__webpack_hmr', '/api/user']
    }))
    
    // .use(async (ctx, next) => {
    //     if(!ctx.request.header.Authorization) {
    //         ctx.status = 401;
    //     }
    //     else {
    //         let token = ctx.request.header.Authorization;
    //         jsonwebtoken.verify(token, secret, function(err, decoded) {
    //             console.log(decoded.data)
    //         });
    //     }
    //     // console.log(ctx.request.header.host);
    // })
    .use(route.routes());
// .use(route.allowedMethods());

if (module.hot) {
    module.hot.accept();
}
module.exports = app;
