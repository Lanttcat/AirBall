/**
 * 用户密码加密
 */

const bcrypt = require('bcrypt');

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

exports.getPasswrdHash = getPasswrdHash;
exports.comparePassword = comparePassword;
