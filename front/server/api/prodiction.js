/*
 * @author nikoManiac
 * @file 预测模块server端
 *
 * */

let query = require('../model/query');

// let db = mongo('match_prodict');

class Prodict{
    constrctor() {

    }

    do(gameid, userid, isBelieve) {
        // 把预测列表写进mongodb，按时进行计算
    }
    validGameId() {

    }
    validUserId() {

    }
    async dict(gameid, aid, isBelieve, airValue) {
        // status 1 未开始  2 已结束
        // isBelieve 0 不相信  1 相信
        let sql = `INSERT INTO match_prodict_record (gameId, aid, isBelieve, airValue, status) VALUES ('${gameid}', '${aid}', '${isBelieve}', '${airValue}', 0)`;
        try {
            let res = await query(sql);
            console.log(res);
            return res;
        }
        catch (e) {
            console.log(e);
            return false;
        }
    }

    async getUserProdict(aid) {
        let sql = `select * from match_list m join match_prodict_record n on m.id=n.gameId and n.aid='${aid}'`;
        try {
            let res = await query(sql);
            return res;
        }
        catch (e) {
            return false;
        }
    }
    /*
     * @return {object} 比赛列表
        * */
    output() {


    }
}

module.exports = Prodict;

