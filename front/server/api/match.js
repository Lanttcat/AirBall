/*
 * @author NikoManiac
 * @file 比赛相关操作
 *
 * */

let query = require('../model/query');

class Match{
    async getMatchList() {
        let date = new Date();
        let currentDate = date.toLocaleDateString();

        let time = (new Date(currentDate)).getTime();

        let maxTime = time + 60 * 60 * 24 * 1000 * 10;
        let minTime = time - 60 * 60 * 24 * 1000 * 10;

        let sql = `SELECT * from match_list WHERE 'matchTime'>='${minTime}' and 'matchTime'<='${maxTime}'`;
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
}

module.exports = Match;
