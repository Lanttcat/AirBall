let mongo = require('../front/server/model/mongodb.js');
let Article = require('../front/server/api/article');

let preData = require('../front/tool/data/article.json');

let articleTool = new Article();

for(item of preData) {
    articleTool.addArticle(item);
}
// articleTool.addArticle(preData[0]);



