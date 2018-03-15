/**
 * 数据库链接状态码，完善错误机制
 */

const errorCode = {
    001: '数据库连接错误',
    002: '创建数据库连接池错误',
    003: '数据库读取错误'
}

module.exports = errorCode;
