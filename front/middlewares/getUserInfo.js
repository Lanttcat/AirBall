/**
 * 获取用户信息
 * @param {Object} context 
 */

import storage from '../lib/storage'

// let token =  storage.getItem('airball_token');
// let time = storage.getItem('airball_time');

export default function ({store, app, route}) {
    console.log(store);
    if (!store.state.userStatus.userStatu.userInfo.aid) {
            // 发送到服务器，token包含aid
        app.$http.get("/api/userInfo", {
            params: {}
        }).then(
            ({data}) => {
                console.log(data)
                if (data.status) {
                    Object.assign(store.state.userStatus.userStatu.userInfo, data.userInfo);
                }
                else {
                    // 暂时什么都不做
                }
            }
        ).catch(() => {
            console.log('发生了错误')
        });
    }
}