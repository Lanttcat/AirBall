/**
 * @file 连接数据库
 * @author lanyixing(lanyixing@baiud.com)
 */

const mysql = require('mysql');

// 设置数据库配置
const isProduct = process.env.NODE_ENV === 'production';

// headless
const dbConfig = {
    prod: {
        connectionLimit: 10,
        host: '123.207.150.130',
        port: '3306',
        user: 'root',
        password: '19951024lyxA',
        database: 'onestep_base'
    },
    dev: {
        connectionLimit: 10,
        host: '123.207.150.130',
        port: '3306',
        user: 'root',
        password: '19951024lyxA',
        database: 'onestep_base'
    }
};

/**
 * 初始化数据库实例
 *
 * @inner
 * @param {Object} config 数据库配置数据
 * @return {Object}
 */
function initDB(config) {
    try {
        let pool = mysql.createPool(config);
        return pool;
    }
    catch (e) {
        return null;
    }
}

// 初始化
function init() {
    // 数据库操作
    let env = isProduct ? 'prod' : 'dev';
    let dbItem = dbConfig[env];
    // 初始化数据库操作
    let pool = initDB(dbItem);
    return pool;
}

function GetMysqlConnectPool() {
    // 初始化数据库
    let pool = init();

    // 数据库连接错误处理
    if (!pool) {
        // 这里抛出错误
        let logger = new Log();
        logger.log({
            site: __filename,
            text: '数据库连接错误'
        });
        return;
    }

    return pool;
}

exports.init = init;
exports.GetMysqlConnectPool = GetMysqlConnectPool;
