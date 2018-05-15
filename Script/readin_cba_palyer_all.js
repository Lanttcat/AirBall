// let https = require('https');
let Ut = require('./lib/sleep.js');

let GetMysqlPool = require('../front/server/model/connectDatabase.js').GetMysqlConnectPool;

let pool = GetMysqlPool();

let json = require('../front/data/cbaPlayerInfo.json');
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

function sqlStr() {
    let valueStrAll = '';
    let valueStr = '';
    for (let i = 0; i < json.length; i++) {
        if (i === 0) {
            valueStr = `('${json[i].id}', '${json[i].player_id}', '${json[i].player_name}', '${json[i].club_id}', '${json[i].player_number}', '${json[i].avatar}', '${json[i].club_name}')`;
        }
        else {
            valueStr = ` ,('${json[i].id}', '${json[i].player_id}', '${json[i].player_name}', '${json[i].club_id}', '${json[i].player_number}', '${json[i].avatar}', '${json[i].club_name}')`;
        }
        valueStrAll += valueStr;
    }

    let sql = `INSERT INTO cba_player (id, player_id, player_name, club_id, player_number, avatar, club_name ) VALUES ${valueStrAll}`;
    return sql;
}

function readin() {
    let sql = sqlStr();
    sqlQuery(sql);
    return;
}

readin();

