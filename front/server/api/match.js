/*
 * @author NikoManiac
 * @file 比赛相关操作
 *
 * */

let query = require('../model/query');

class Match{

    /*
     * 将时间戳转换成当前日期的零点时间戳
     * @return {String} 零点时间戳
     *
        * */
    _getIntTime(timer) {
        let time = timer || (new Date()).getTime();

        let date = new Date(time);

        let currentDate = date.toLocaleDateString();

        let res = (new Date(currentDate)).getTime();

        return res;
    }
    /*
     * @param {Array} selectDate
     *
     * */

    async getOneMatch(selectTimer) {

        let intTime = this._getIntTime(selectTimer);

        let maxTime = intTime + 60 * 60 * 24 * 1000 * 1;

        // 查询一天

        let sql = `SELECT * from match_list WHERE matchTime>='${intTime}' and matchTime<='${maxTime}'`;
        console.log(sql);

        try {
            let res = await query(sql);

            // 要对数据进行处理，按天进行分组

            return res;
        }
        catch (e) {
            console.log(e);

            return false;
        }
    }
    async getShowMatchList(days) {

        // 获取展示的比赛列表
        let timer = this._getIntTime();

        let maxTime = timer + 60 * 60 * 24 * 1000 * 1;
        let minTime = timer - 60 * 60 * 24 * 1000 * days;

        let sql = `SELECT * from match_list WHERE matchTime>='${minTime}' and matchTime<='${maxTime}' ORDER BY matchTime`;
        console.log(sql);
        try {
            let res = await query(sql);

            return res;
        }
        catch (e) {
            console.log(e);
            return false;
        }

    }
}

module.exports = Match;
