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

Vue.prototype.$http = axios;

Vue.config.productionTip = false;

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
