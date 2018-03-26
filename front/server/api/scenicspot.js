/**
 * 景点数据获取
 */

let mongo = require('mongoose');

mongo.connect('mongodb://admin_lan:19951024lyxA@123.207.150.130:27017/airball_db');

let Schema = mongo.Schema;

// 错误信息
const msgStatusText = {
    error: '评论失败，请稍后再次尝试',
    success: '评论成功'
};

// 定义Schema

// 要做情感分析
let scenicspotSchema = new Schema({
    name: String,
    star: Number,
    tags: [String],
    zan: Number,
    intro: String,
    index: Number,
    imgSrc: String,
    phone: String,
    website: String,
    reftime: String,
    userId: 0,
    userName: 0,
    comments: [
        {
            userId: Number,
            parentNodeId: Number,
            parentNodeName: String,
            content: String,
            zan: Number,
            time: Date,
            imgs: [String],
            commentView: []
        }
    ],
    creatTime: Date,
    similarscenicspot: [
        {
            scenicspotId: Number
        }
    ]
}, {
    collection: 'scenicspot'
});

let Scenicspot = mongo.model('scenicspot', scenicspotSchema);

scenicspotSchema.statics.queryscenicspot = async function(aid) {
    let data = {};
    let res = await this.find({
        userId: aid
    });
    return res;
};

// 关闭连接
// mongoose.disconnect();

/**
 * 查询当前文章的所有评论
 */
// function queryAllComment(aid) {

// }
// addComment({userId: 4444});

let scenicspot = {
    addscenicspot: async (info) => {
        // 文章发布操作
        let result = {};
        let newscenicspot = new Scenicspot(info);
        try {
            let res = await newscenicspot.save();
            console.log(`添加成功：${info.name}`);
            result.message = '添加发布成功';
            result.status = true;
            result.data = res;
        }
        catch (e) {
            console.log(e);
            result.message = '数据添加失败';
        }
        return result;
    },
    selectScenicspot: async (scenicspotId) => {
        let result = {};
        // 查询文章
        try {
            let res = await Scenicspot.find({
                _id: scenicspotId
            });
            // let res = await scenicspot.queryscenicspot(scenicspotId);
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
    },
    selectSomeScenicspot: async (num) => {
        let result = {};
        // 查询文章
        try {
            let res = await Scenicspot.find({
                index: {
                    $lt: 4
                }
            }, {
                name: 1,
                userName: 1,
                imgSrc: 1,
                intro: 1
            });
            // let res = await scenicspot.queryscenicspot(scenicspotId);
            console.log(res);
            res.forEach((item) => {
                item.tags = ['景点', '热门'];
                item.intro = item.intro.replace(/\s+/g, '').substr(0, 10) + '...';
            });
            result.message = '获取文章成功';
            result.status = true;
            result.data = res;
        }
        catch (e) {
            console.log(e);
            result.message = '获取文章失败';

        }
        return result;
    },
    selectComment: (body) => {
        // 读取评论

    },
    selectZan: (body) => {
        // 读取点赞数量

    },
    addComment: async (scenicspotId, commentInfo) => {
        let result = {};
        // 参考文章
        // https://codeday.me/bug/20180204/128355.html
        // https://cnodejs.org/topic/548e54d157fd3ae46b233502
        // 添加评论
        try {
            let doc = await scenicspot.findOneAndUpdate(scenicspotId);
            result.status = true;
            result.doc = doc;
            result.message = '评论成功';
        }
        catch (e) {
            console.log(e);
            result.message = '评论失败';
        }

        return result;
    },
    addZan: () => {
        // 增加点赞
    }

};

module.exports = scenicspot;
