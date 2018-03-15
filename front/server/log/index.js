/**
 * 服务器日志模块-系统运行日志
 */

const fs = require('fs');
const path = require('path');

/**
 * 1. 创建文件
 * 2. 输入
 * 3. 暴露一个log方法
 */

class LogSystem {
    constructor(logFileName) {
        this.logFileName = path.normalize(__dirname + '/logger/' + logFileName);
    }

    log(infoObj) {
        let time = new Date().getTime(),
            site = infoObj.site,
            detail = infoObj.text;

        let logText = `${time}-${site}-${detail}\n`;

        fs.appendFileSync(this.logFileName, logText, (err) => {
            console.log('写入错误:' + err);
        });
    }
}

// let logger = new LogSystem('test.txt');
// logger.log({site: 'ddddd', text: '测试'});
module.exports = LogSystem;
