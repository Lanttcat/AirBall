let query = require('../../model/query');

async function userLogin(phoneNume) {
    let sql = 'select * from userInfo';
    try {
        let res = await query(sql);
        return res;
    }
    catch (e) {
        console.log(e);
        return '002';
    }
}

module.exports = userLogin;
