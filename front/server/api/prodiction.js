/*
 * @author nikoManiac
 * @file 预测模块server端
 *
 * */

let mongo = require('../model/mongodb.js');

let db = mongo('match_prodict');

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
    dict(gameid, userid, isBelieve) {

    }
    /*
     * @return {object} 比赛列表
        * */
    output() {
        let obj = {
            name:
        }
    }
}

