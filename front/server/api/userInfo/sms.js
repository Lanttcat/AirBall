/**
 * 云通信基础能力业务短信发送、查询详情。
 * Created on 2017-07-31
 */
const SMSClient = require('@alicloud/sms-sdk');

// ACCESS_KEY_ID/ACCESS_KEY_SECRET 根据实际申请的账号信息进行替换
const accessKeyId = 'LTAIc4fl7xr9G8Un';
const secretAccessKey = 'Es8cipUuolxlBmL2Jh5xRSJKtdCTW3';

// 初始化sms_client
let smsClient = new SMSClient({accessKeyId, secretAccessKey});

function createCode() {
    // 主要利用数学计算
    let codeRandom = Math.round(Math.random() * 10000);

    return codeRandom;
}

/**
 * 发送短信验证码
 * @param {number} phoneNum 
 */
async function sendCode(phoneNum) {

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
}

module.exports = sendCode;
