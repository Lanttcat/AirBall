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
    let db = await mongoose.createConnection(str);

    return db;
}

module.exports = mongo;