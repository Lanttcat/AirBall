/**
 * 用户登录相关
 */

let query = require('../model/query');
let crypto = require('crypto');  //加载crypto库
let qiniu = require('qiniu');

/**
 * 云通信基础能力业务短信发送、查询详情。
 */
const SMSClient = require('@alicloud/sms-sdk');

// ACCESS_KEY_ID/ACCESS_KEY_SECRET 根据实际申请的账号信息进行替换
const accessKeyId = 'LTAIc4fl7xr9G8Un';
const secretAccessKey = 'Es8cipUuolxlBmL2Jh5xRSJKtdCTW3';
// 七牛云
const qiniuAccessKey = 'foNZ5jdbJwZMMK68_zWupMM-fB7DztNkW2CEX0DI';
const qiniuSecretAccessKey = '7nmUhCFtiY_BQzVJ4R4kkkMk4xAH1NOsvBOwVoG7';


// 初始化sms_client
let smsClient = new SMSClient({accessKeyId, secretAccessKey});
// 初始化七牛mac
var mac = new qiniu.auth.digest.Mac(qiniuAccessKey, qiniuSecretAccessKey);

function createCode() {
    // 主要利用数学计算
    let codeRandom = Math.round(Math.random() * 10000);

    return codeRandom;
}

function creatAid(phone) {
    let content = phone + '' + (new Date().getTime());//加密的明文；
    console.log(content);
    let md5 = crypto.createHash('md5');//定义加密方式:md5不可逆,此处的md5可以换成任意hash加密的方法名称；
    md5.update(content);
    let aid = md5.digest('hex');  //加密后的值d
    return aid
}
let user = {
    registration: async (body) => {
        let aid = creatAid(body.userPhone);
        let sql = `INSERT INTO userbaseinfo (aid, name, phone, password) VALUES ('${aid}', '${body.userPhone}', '${body.userPhone}', '${body.hashPassword}')`;
        try {
            let res = await query(sql);
            return res;
        }
        catch (e) {
            console.log(e);
            return false;
        }
    },
    verificationCode: async (phoneNum) => {
        // 返回的数据格式
        // 1. code 2. null
        let phone = phoneNum;
        let code = createCode();
        try {
            let res = await smsClient.sendSMS({
                PhoneNumbers: phone,
                SignName: 'OneStep茶途',
                TemplateCode: 'SMS_125116796',
                TemplateParam: `{"code":${code}}`
            });
            console.log(res);
            code = res.Code === 'OK' ? code : null;

            return code;

        }
        catch (e) {
            console.log(e);
        }
    },
    login: async (body) => {
        let sql = `select aid, phone, name, password, intro, site, age, avatar, homeBanner, repu 
                from userbaseinfo 
                where phone = '${body.userPhone}';`;
        try {
            let res = await query(sql);
            return res;
        }
        catch (e) {
            console.log(e);
            return false;
        }
    },

    /**
     * 获取用户信息
     */
    getUserInfoById: async (aid) => {
        let sql = `select aid, phone, name, intro, site, age, avatar, repu, homeBanner 
                from userbaseinfo 
                where aid = '${aid}';`;
        console.log(sql);
        try {
            let res = await query(sql);
            console.log(res[0]);
            return res[0];
        }
        catch (e) {
            console.log(e);
            return false;
        }
    },

    getQiniuToken() {
        let options = {
            scope: 'airball',
            // returnBody: '{"key":"$(key)","hash":"$(etag)","fsize":$(fsize),"bucket":"$(bucket)","name":"$(x:name)"}'
        };
        let putPolicy = new qiniu.rs.PutPolicy(options);
        let uploadToken=putPolicy.uploadToken(mac);

        return uploadToken;
    },

    userSetting: async (aid, type, value) => {
        let sql = `UPDATE userbaseinfo SET ${type}='${value}' WHERE aid='${aid}';`;
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
};
module.exports = user;
