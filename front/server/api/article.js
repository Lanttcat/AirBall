/**
 * 文章相关操作
 */

let mongoose = require('../model/mongodb.js');
let query = require('../model/query');

let mongo = mongoose('article');


let Schema = mongo.Schema;

// 错误信息
const msgStatusText = {
    error: '评论失败，请稍后再次尝试',
    success: '评论成功'
};

// 定义Schema
let articleSchema = new Schema({
    id: Number,
    title: String,
    authorId: String,
    authorName: String,
    content: String,
    tags: [String],
    status: Number,
    commentArray: [
        {
            userId: String,
            userV: String,
            userName: String,
            parentNodeId: String,
            parentNodeName: String,
            content: String,
            count: Number,
            zanCount: Number,
            time: Date
        }
    ],
    creatTime: Number,
    updateTime: Number,
    similarArticle: [
        {
            articleId: Number
        }
    ]
}, {
    collection: 'article'
});

let ArticleModel = mongo.model('article', articleSchema);

articleSchema.statics.queryArticle = async function(aid) {
    let data = {};
    let res = await this.find({
        userId: aid
    });
    return res;
};

class Article {
    async addArticle (info) {
        // 文章发布操作
        let result = {};
        let newArticle = new ArticleModel({
            title: info.title,
            authorId: info.authorId,
            authorName: info.authorName || 'Airball官方',
            content: info.content,
            tags: info.tags,
            creatTime: (new Date().getTime()),
            updateTime: (new Date().getTime())
        });
        try {
            let res = await newArticle.save();
            console.log(res);
            result.message = '文章发布成功';
            result.status = true;
            result.data = res;
        }
        catch (e) {
            result.message = '文章发布失败';
        }
        console.log(result);
        return result;
    }
    async selectArticle(articleId) {
        // 步行街获取文章根据更新时间排列
        let result = {};
        // 查询文章
        try {
            let res = await ArticleModel.find({
                _id: articleId
            });
            // let res = await Article.queryArticle(articleId);
            console.log(res);
            result.message = '获取文章成功';
            result.status = true;
            result.data = res;
        }
        catch (e) {
            console.log(e);
            result.message = '获取文章失败';

        }
        return result;
    }
    async selectAllArticle(lastTime) {
        // 步行街获取文章根据更新时间排列
        // 先根据时间戳计算，后期需要优化

        let result = {};

        let  condition = lastTime ? {"updateTime":{$lt:parseInt(lastTime)}} : {};
        console.log(condition);
        // 查询文章
        try {
            let res = await ArticleModel.find(condition).sort({"updateTime": -1}).limit(5);
            // let res = await Article.queryArticle(articleId);
            // console.log(res);
            result.message = '获取文章成功';
            result.status = true;
            result.data = res;
            result.lastTime = res[res.length-1].updateTime
        }
        catch (e) {
            console.log(e);
            result.message = '获取文章失败';

        }
        return result;
    }
    
    /**
     * 添加收藏
     * @param {String} aid 用户id
     * @param {String} articleId 文章id
     */
    async addCollect(body) {
        let str = `insert into article_collect (articleId, aid, name, author) value ('${body.articleId}', '${body.aid}', '${body.title}', '${body.author}');`;
        try {
            let res = await query(str);
            return true;
        }
        catch (e) {
            console.log(e);
            return false;
        }
    }

    /**
     * 取消收藏
     * @param {String} aid 用户id
     * @param {String} articleId 文章id
     */
    async delCollect(aid, articleId) {

    }

    selectComment(body) {
        // 读取评论

    }
    selectZan(body) {
        // 读取点赞数量

    }

     /**
     * 添加评论
     * @param {Object} body 评论信息集合
     */
    async addComment(id, commentInfo) {
        let result = {};
        try {
            let doc = await ArticleModel.update({'_id':id}, {'$push':{'commentArray': commentInfo}});
            result.status = true;
            result.doc = doc;
            console.log(result);
            result.message = '评论成功';
        }
        catch (e) {
            console.log(e);
            result.message = '评论失败';
        }
        return result;
    }
    async findComment (articleId, commentInfo) {
        let result = {};
        // 参考文章
        // https://codeday.me/bug/20180204/128355.html
        // https://cnodejs.org/topic/548e54d157fd3ae46b233502
        // 添加评论
        try {
            let doc = await ArticleModel.findOneAndUpdate(articleId);
            result.status = true;
            result.doc = doc;
            result.message = '评论成功';
        }
        catch (e) {
            console.log(e);
            result.message = '评论失败';
        }

        return result;
    }

    /**
     * 获取关注文章列表
     * @param {String} articleId 
     */
    async searchLikeArticle(articleId) {

    }

    /**
     * 获取用户发布过的文章
     * @param {String} aid 
     */
    async searchUserOwnArticle(aid) {

    }
    addZan() {
        // 增加点赞
    }
    insertMany(data) {
        ArticleModel.insertMany(data, function(error, doc) {
            if (error) {
                console.log(error);
            }
            else {
                console.log(doc);
            }
        })
    }

    async searchArticleByTags(key) {
        let res = await ArticleModel.find({tags: key}).sort({"updateTime": -1}).limit(5);
        return res;
    }

}

module.exports = Article;
