// let https = require('https');
let Ut = require('./lib/sleep.js');

let GetMysqlPool = require('../front/server/model/connectDatabase.js').GetMysqlConnectPool;

let pool = GetMysqlPool();

let json = require('../front/data/cbaTeamInfo.json');
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
            valueStr = `('${json[i].id}', '${json[i].club_id}', '${json[i].name}', '${json[i].club_name}', '${json[i].logo}', '${json[i].coach_name}', '${json[i].club_abbr}')`;
        }
        else {
            valueStr = ` ,('${json[i].id}', '${json[i].club_id}', '${json[i].name}', '${json[i].club_name}', '${json[i].logo}', '${json[i].coach_name}', '${json[i].club_abbr}')`;
        }
        valueStrAll += valueStr;
    }

    let sql = `INSERT INTO cba_team (id, club_id, name, club_name, logo, coach_name, club_abbr ) VALUES ${valueStrAll}`;
    return sql;
}

function readin() {
    let sql = sqlStr();
    sqlQuery(sql);
    return;
}

readin();

