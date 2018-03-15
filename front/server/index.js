/**
 * @file 创建Koa实例，use必要的组件
 * @author lanyixing@live.com
 */

const Koa = require('koa');
const route = require('./server.js');
const bodyParser = require('koa-bodyparser');
const jwtErrorHandle = require('./middlewares/jwtErrorHandle.js');

// 引入验证
const jwt = require('koa-jwt');

const secret = 'oneStep_secret';

let app = new Koa();

// 加入必要的插件
app.use(bodyParser())
    .use(jwt({
        secret
    }).unless({
        path: [/\/login/, /\//]
    }))
    .use(jwtErrorHandle)
    .use(route.routes());
// .use(route.allowedMethods());

if (module.hot) {
    module.hot.accept();
}

module.exports = app;
