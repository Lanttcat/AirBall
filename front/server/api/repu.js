/*
 * @author NikoManiac
 * @file 声望模块
 *
* */
let query = require('../model/query');


class Repu {
    // TODO: 用户id验证
    // 行为类别Air值计算
    _repuType = {
        1: 10,  // 发布
        2: 1,  //  评论点赞
        3: 1,  // 主页点赞
        4: 10  // 举报
    };

    /**
    * Air值操作处理
    * @param {String} payer 付款方
    * @param {String} payee 收款方
    * @param {Number} type 行为类别
    * @param {String} note 备注
    * @param {Number} extraValue 自定义Air值：投注、赞赏等使用
    */
    async do(payer, payee, type, note, extraValue) {

        let value = this._repuType[type] || extraValue;
        // 1 验证付款方账户余额
        if(await checkPayer(payer, value)) {
            return {
                statu: false,
                msg: '账户余额不足'
            }
        }
        // 2 分发处理 预测需要写状态
        let recodeRes = await this.addRecord(payer, payee, value, type, note);
        let payeeRes = await this.add(payee, value);
        let payerRes = await this.del(payer, value);

        if(recodeRes && payeeRes && payerRes) {
            return payerRes;
        }
        else {
            return {
                statu: false,
                msg: 'Air操作失败'
            }
        }

    }

    /**
     * 检查支付账户余额
     * @param {String} id 
     * @param {Number} value 
     */
    async checkPayer(id, value) {
        let sql = `select repu from userbaseinfo where aid = '${id}';`;
        try {
            let res = await query(sql);
            return value <= res ? true : false;
        }
        catch (e) {
            console.log(e);
            return false;
        }
    }

    /**
    * 添加Air值
    * @param {String} id 
    * @param {Number} value 
    */
    async add(id, value) {
        // let value = computeVal(type);
        let sqlStr = this.sql(id, '+', value);
        try {
            let res = await query(sqlStr);
            return res;
        }
        catch (e) {
            console.log(e);
            return false;
        }
    }

    /**
    * 扣除Air值
    * @param {String} id 
    * @param {Number} value 
    */
    async del(id, value) {
        // let value = computeVal(type);
        // 需要先进行验证
        let sqlStr = this.sql(id, '-', value);
        try {
            let res = await query(sqlStr);
            return res;
        }
        catch (e) {
            console.log(e);
            return false;
        }
    }
    
    /**
     * 增加和减少的sql语句生成
     * @param {String} id 
     * @param {Number} type 
     * @param {Number} value 
     */
    sql(id, type, value) {
        // 因为只涉及更新，可以使用同一的sql
        let sql = `UPDATE userbaseinfo SET repu=repu${type}value WHERE aid='${id}';`;
        return sql;
    }

    /**
    * 账单添加
    */
    async addRecord() {
        let sql = `INSERT INTO repu_record (payer, payee, value, type, note) VALUES ('${payer}', '${payee}', '${value}', '${type}', '${note}');`;
    }
}
