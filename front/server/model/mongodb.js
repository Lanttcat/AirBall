/**
 * 连接mongodb
 */
let mongoose = require('mongoose');

const config = require('../../config.js').mongodb;

/**
 * 连接mongodb 返回数据库实例
 * @param {String} database 需要连接的数据库
 */
function mongo(database) {
    let str = `mongodb://${config.username}:${config.password}@${config.host}:${config.port}/${database}`;
    console.log(str);
    // mongo.connect('mongodb://kevin:19951024kevinA@123.207.150.130:27017/article');
    mongoose.connect(str);

    return mongoose;
}

module.exports = mongo;