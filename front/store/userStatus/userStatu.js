/**
 * 用户状态
 */
import axios from 'axios';
import storage from '../../lib/storage';

export let state = () => {
    return {

        /**
         * 用户登录状态 1. 登录 0： 未登录 2: 异常，需要设定自动注销
         */
        userInfo: {
            status: 1,
            phone: 1111,
            aid: null,
            name: '',
            age: null,
            site: '',
            intro: '',
            repu: 0,
            avatar: 'http://p8p6o46oy.bkt.clouddn.com/default_uesr_title.jpg'
        }
    };
};

export const mutations = {
    syncUserInfo(state, userData) {
        Object.assign(state.userInfo, userData);
    }
};

export const actions = {

    /**
     * 同步用户信息,主要是用户解决用户二次进入的时候，没有存储用户信息
     *
     * @param {Function} commit commit
     * @param {Object} appHeader appHeader
     */
    setUserInfo({state, commit}) {
        if (!state.userInfo.aid) {
            
            let token = storage.getItem('airball_token');
            if (token) {
                const options = {
                    method: 'GET',
                    headers: { 'Authorization': 'Bearer ' + token },
                    url: '/api/userInfo',
                };

                axios(options).then(
                    ({data}) => {
                        if (data.status) {
                            commit('syncUserInfo', data.userInfo);
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
    }
};
