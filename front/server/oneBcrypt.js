/**
 * 用户密码加密
 */

const bcrypt = require('bcrypt');
const crypto = require('crypto');

const saltRounds = 10;

async function getPasswrdHash(password) {
    let hash;
    try {
        hash = await bcrypt.hash(password, saltRounds);
    }
    catch (error) {
        hash = false;
    }
    return hash;
}

async function comparePassword(password, hash) {
    let res;
    try {
        res = await bcrypt.compare(password, hash);
        console.log(res);
    }
    catch (err) {
        console.log(err);
        res = false;
    }
    console.log(res);
    return res;
}
function creatAid(phone) {
    let content = phone + '' + (new Date().getTime());
    let md5 = crypto.createHash('md5');//定义加密方式:md5不可逆,此处的md5可以换成任意hash加密的方法名称；
    md5.update(content);
    let aid = md5.digest('hex');  //加密后的值d
    return aid;
}

exports.getPasswrdHash = getPasswrdHash;
exports.comparePassword = comparePassword;
