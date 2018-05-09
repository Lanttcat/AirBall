let mongo = require('../front/server/model/mongodb.js');

let db = mongo('match_prodict');

let Schema = mongo.Schema;

// 定义Schema
let matchProdictSchema = new Schema({
    id: Number,
    title: String,
    authorId: String,
    authorName: String,
    content: String,
    tags: [String],
    status: Number,
    commentArray: [
        {
            userId: Number,
            userName: String,
            parentNodeId: Number,
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
    collection: 'match_prodict'
});

let matchProdictModel = mongo.model('match_prodict', matchProdictSchema);