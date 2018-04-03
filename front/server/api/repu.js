/*
 * @author NikoManiac
 * @file 声望模块
 *
    * */
let query = require('../model/query');

// read the last repu
let value = {
    publish: 50,
    zan1000: 20,
    jubao: -50
};

function computeVal(type) {
    // 静态声望计算，
    if (value[type]) {
        return value;
    }
    else {
        // 需要读取数据库
        //
    }
    // 动态声望计算---主要是预测相关
}
let repu = {
    allRepu() {

    },
    sql(id, value) {
        // 因为只涉及更新，可以使用同一的sql
        let  sql = ``;
    },
    async add(id, type) {
        let value = computeVal(type);
        let sqlStr = this.sql(id, value);
    },
    async del(id, type) {
        let value = computeVal(type);
        let sqlStr = this.sql(id, value);
    }
}
