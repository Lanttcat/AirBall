let GetMysqlConnectPool = require('./connectDatabase.js').GetMysqlConnectPool;
let Log = require('../log/index');

let pool = GetMysqlConnectPool();

/**
 * 数据库操作
 *
 * @inner
 * @param {Object} dbConn 数据库实例句柄
 * @param {string} sql sql命令
 */
function sqlQuery(sql) {
    // 需要建立失败状态处理
    return new Promise((resolve, reject) => {
        pool.query(sql, function (error, results, field) {
            if (error) {
                console.log(error);
                reject();
            }
            else {
                resolve(results);
            }
        });
    });
}

//  设计初衷：每个路由都可以基于基础类进行各自数据库的封装
// class queryBase {
//     constructor(table) {
//         this.table = table;
//     }

//     _addTable (sql) {
//         return sql + ' ' + this.table;
//     }
//     // 插入
//     insert(data) {

//     }

//     // 查找
//     find (data) {
//         data = {
//             returnColumn: ['dd'],
//             conditionQuery: {
//                 symbol: 'where',
//                 cloName: 'dd',
//                 cloValue: 'ddd'
//             }
//         }
//         // {column: value}
//         let sql = 'select * from'
//     }

//     // 自定义sql语句
//     customQuery() {

//     }
// }
module.exports = sqlQuery;
