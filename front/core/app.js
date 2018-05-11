/**
 * @file entry
 * @author lanyixing(lanyixing@baidu.com)
 */

import Vue from 'vue';
import Meta from 'vue-meta';
// import axios from 'axios';
import axios from './axios.js';

import {createRouter} from '@/.lavas/router';
import {createStore} from '@/.lavas/store';
import AppComponent from './App.vue';
import Vuetify from 'vuetify';
import storage from '../lib/storage'
import {ActionMonitor} from '../plugin/ActionMonitor';

Vue.use(Meta);

Vue.use(Vuetify);

Vue.use(ActionMonitor);

Vue.config.productionTip = false;

Vue.prototype.$http = axios;

export function createApp() {
    let router = createRouter();

    router.beforeEach((to, from, next) => {
        //注册全局钩子用来拦截导航
        //获取store里面的token
        let token =  storage.getItem('airball_token');
        let time = storage.getItem('airball_time');
        //判断要去的路由有没有requiresAuth
        if (to.meta.requiresAuth){
            if (token){
                // 检查是否过期 ()
                if (parseInt(time) - (new Date()).getTime() > 1000 * 60 * 60 * 24) {
                    next({
                        path: '/login',
                        query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
                    });
                }
                else {
                    next();
                }
            }
            else {
                next({
                    path: '/login',
                    query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
                });
            }
        }
        else {
            next();//如果无需token,那么随它去吧
        }
    });

    let store = createStore();

    axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';

    //request拦截器
    axios.interceptors.request.use(
        config => {
            //每次发送请求之前检测都vuex存有token,那么都要放在请求头发送给服务器
            let token = storage.getItem('airball_token');
            if(token){
                config.headers.Authorization = `Bearer ${token}`;
            }
            else {
                router.replace({ //跳转到登录页面
                    path: 'login',
                    query: { redirect: router.currentRoute.fullPath } // 将跳转的路由path作为参数，登录成功后跳转到该路由
                });
            }
            return config;
        },
        err => {
            router.replace({ //跳转到登录页面
                path: 'login',
                query: { redirect: router.currentRoute.fullPath } // 将跳转的路由path作为参数，登录成功后跳转到该路由
            });
        }
    );
    //respone拦截器
    axios.interceptors.response.use(
        response => {
            return response;
        },
        error => { //默认除了2XX之外的都是错误的，就会走这里
            if(error.response){
                switch(error.response.status){
                    case 401:
                        // store.dispatch('UserLogout'); //可能是token过期，清除它
                        storage.removeItem('airball_token');
                        router.replace({ //跳转到登录页面
                            path: 'login',
                            query: { redirect: router.currentRoute.fullPath } // 将跳转的路由path作为参数，登录成功后跳转到该路由
                        });
                }
            }
            return '认证失败'
        }
    );
    let App = Vue.extend({
        router,
        store,
        ...AppComponent
    });
    return {App, router, store};
}



if (module.hot) {
    module.hot.accept();
}
