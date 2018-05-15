let query = require('../model/query');
let Article = require('./article');

let article = new Article();

class Search{
    _getCurrentTime() {

    }

    /**
     * 按照标签查找文章
     */

    async getArticleByTag() {

    }

    /**
     * 根据作者名获取文章
     */
    async getArticleByAuth() {

    }

    /**
     * 搜索作者
     */

    async searchAuth() {

    }

    /**
     * 获取球员 直接跳转到球员列表
     */
    searchPlayer(str) {
        let sql = `select * from cba_player where player_name like BINARY '%${str}%'`;
        return sql;
        
    }

    searchAboutTeam(str) {
        // select * from cba_team where name like BINARY '%北京%' or club_name like BINARY '%北京%' or coach_name like BINARY '%北京%' or club_abbr like BINARY '%北京%'
        let sql = `select * from cba_team where name like BINARY '%${str}%' or club_name like BINARY '%${str}%' or coach_name like BINARY '%${str}%' or club_abbr like BINARY '%${str}%'`;
        return sql;
    }

    async returnSearchValue(key) {
        let data = {};
        try {
            data.player = await query(this.searchPlayer(key));
            data.team = await query(this.searchAboutTeam(key));
            data.article = await article.searchArticleByTags(key);

            return data;
        }
        catch (e) {
            console.log(e);
            return data;
        }
    }
 
}

module.exports = Search;