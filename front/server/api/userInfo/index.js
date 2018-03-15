/**
 * 暴露所有有关用户操作的方法
 */

let userLogin = require('./user');
let sms = require('./sms');

exports.userLogin = userLogin;
exports.sms = sms;
