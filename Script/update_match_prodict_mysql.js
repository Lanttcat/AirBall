// let https = require('https');
let Ut = require('./lib/sleep.js');

let GetMysqlPool = require('../front/server/model/connectDatabase.js').GetMysqlConnectPool;

let pool = GetMysqlPool();

let json = require('./data/prodict_match_res.json');
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
        try {
            pool.query(sql, function (error, results, field) {
                if (error) {
                    console.log(error);
                    reject();
                }
                else {
                    resolve(results);
                }
            });
        }
        catch (e) {
            console.log(e);
        }
    });
}

function sqlStr() {

    let valueStrAll = '';
    let valueStr = '';
    let winStr = '',
        loseStr = '',
        proStr = '',
        id = '';
    for (let i = 0; i < json.length; i++) {
        winStr += `WHEN ${json[i].id} THEN '${json[i].win}'\n`;
        loseStr += `WHEN ${json[i].id} THEN '${json[i].lose}'\n`;
        proStr += `WHEN ${json[i].id} THEN ${json[i].probability}\n`;
        if (i !== json.length -1) {
            id += `${json[i].id}, `
        }
        else {
            id += `${json[i].id}`;
        }
        
    }

    let sql = `UPDATE match_list
                SET prodict_win = CASE id\n${winStr}\nEND,\nprodict_lose = CASE id\n${loseStr}\nEND,\nprobability = CASE id \n${proStr}\nEND\n WHERE id IN (${id})`;
    return sql;
}

function readin() {
    let sql = sqlStr();
    console.log(sql);
    try {
        sqlQuery(sql); 
    }
    catch (e) {
        console.log(e);
    }
    // sqlQuery(sql);
    return;
}

readin();

