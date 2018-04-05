/**
 * 数据请求处理层
 */

const Router = require('koa-router');
const oneBcrypt = require('./oneBcrypt');

let user = require('./api/user');
let article = require('./api/article');
let scenicspot = require('./api/scenicspot');
let Match = require('./api/match.js');
const jwt = require('jsonwebtoken');

let route = new Router();

const secret = 'oneStep_secret';

// 用户相关---------------------------------------------------------------------------
route.get('/api/user', async (ctx) => {
    // 验证码
    let phone = ctx.query.userPhone;
    console.log('输入的手机号：' + phone);
    try {
        let res = await user.verificationCode(phone);
        status = res ? 1 : 0;
        // let data = res ? createdMd5(createdMd5(res.toString()).toString()) : 0;
        // console.log(res);
        ctx.response.type = 'json';
        ctx.response.body = {
            status: status,
            data: res
        };
    }
    catch (err) {
        console.log(err);
    }
});

// 注册
route.post('/api/user', async (ctx) => {
    const {body} = ctx.request;
    body.hashPassword = await oneBcrypt.getPasswrdHash(body.userPassword);
    console.log(body.hashPassword);
    if (!body.hashPassword) {
        ctx.body = {
            message: '服务器繁忙'
        };
    }

    console.log(`注册接收到的数据为${body}`);
    try {
        let res = await user.registration(body);
        console.log(res);
        if (!res) {
            ctx.status = 401;
            ctx.body = {
                message: '服务器繁忙'
            };
        }
        else {
            ctx.body = {
                status: true,
                message: '注册成功'
            };
        }
    }
    catch (error) {
        ctx.throw(500);
    }

});

// 登录
route.put('/api/user', async (ctx) => {
    const {body} = ctx.request;
    console.log(body);
    try {
        const userInfo = await user.login(body);
        console.log(userInfo.length);
        if (userInfo.length < 1) {
            ctx.status = 200;
            ctx.body = {
                message: '用户名错误'
            };
            return;
        }

        // 匹配密码是否相等
        let flag = await oneBcrypt.comparePassword(body.userPassword, userInfo[0].password);
        if (flag) {
            delete userInfo[0].upassword;
            ctx.status = 200;
            ctx.body = {
                status: true,
                message: '登录成功',
                user: userInfo[0],
                // 生成 token 返回给客户端
                token: jwt.sign({
                    data: userInfo[0].uphone,
                    // 设置 token 过期时间
                    exp: Math.floor(Date.now() / 1000) + (60 * 60), // 60 seconds * 60 minutes = 1 hour
                }, secret)
            };
        }
        else {
            ctx.status = 200;
            ctx.body = {
                message: '密码错误'
            };
            return;
        }
    }
    catch (error) {
        console.log(error);
        ctx.throw(500);
    }

});

// 文章相关------------------------------------------------------------------------

route.post('/api/comment', async (ctx) => {
    let commentInfo = {};
    let {body} = ctx.request;
    commentInfo.userId = body.userId;
    commentInfo.content = body.content;
    commentInfo.parentNodeId = body.parentNodeId;

    let res = await article.addComment(body.articleId, commentInfo);
    console.log(res);
    ctx.response.type = 'json';
    ctx.response.body = {
        data: res
    };
});

// 存文章
route.post('/api/article', async (ctx) => {
    let {body} = ctx.request;
    let res = await article.addArticle(body);
    ctx.response.type = 'json';
    ctx.response.body = {
        data: res
    };
});

// 步行街获取文章列表，根据uptime排序
route.get('/api/allArticle', async (ctx) => {
    let lastTime = ctx.query.lastTime;
    let res = await article.selectAllArticle(lastTime);
    ctx.response.type = 'json';
    ctx.response.body = {
        data: res
    };
});


route.get('/api/article', async (ctx) => {
    let articleId = ctx.query.articleId;
    console.log(articleId);
    let res = await article.selectArticle(articleId);
    ctx.response.type = 'json';
    ctx.response.body = {
        data: res
    };
});

// 获取景点
route.get('/api/scenicspot', async (ctx) => {
    let num = ctx.query.num;
    console.log(num);
    let res = await scenicspot.selectSomeScenicspot(num);
    ctx.response.type = 'json';
    ctx.response.body = {
        data: res
    };
});
route.get('/api/scenicspotList', async (ctx) => {
    let id = ctx.query.id;
    console.log(id);
    let res = await scenicspot.selectScenicspot(id);
    ctx.response.type = 'json';
    ctx.response.body = {
        data: res
    };
});
// 比赛相关请求
let match = new Match();
route.get('/api/match', async (ctx) => {
    console.log('cdddddd')
    let res = await match.getMatchList();
    ctx.response.type = 'json';
    ctx.response.body = {
        data: res
    };
});



// 插入文章
module.exports = route;
