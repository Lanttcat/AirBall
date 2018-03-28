let fs = require('fs');
let articleTool = require('../server/api/article.js');


let file="./data/article.json";
let result=JSON.parse(fs.readFileSync(file));

console.log(result);

articleTool.insertMany(result);

