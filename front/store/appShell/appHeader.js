/**
 * @file appShell/appHeader module
 * @author lavas
 */

export const SET_APP_HEADER = 'SET_APP_HEADER';

export const state = () => {
    return {
        // 导航栏默认透明，尽量统一样式

        /**
         * 是否展示顶部导航栏
         *
         * @type {boolean}
         */
        isShowHeader: true,

        /**
         * 标题内容
         *
         * @type {string}
         */
        title: '茶途',

        // 是否显示搜索栏
        isShowInputSearch: false,
        isShowBtnSearch: false,

        // 左侧按钮 type: logo/icon src:名称或src
        leftBtn: {
            isShow: true,
            isLog: true,
            src: 'arrow_back',
            alt: ''
        },

        /**
         * 是否展示左侧菜单图标
         *
         * @type {boolean}
         */
        showMenu: false,

        /**
         * 是否展示左侧返回图标
         *
         * @type {boolean}
         */
        showBack: false,

        /**
         * 是否展示左侧logo
         *
         * @type {boolean}
         */
        showLogo: true,

        /**
         * 右侧操作按钮数组
         *
         * @type {Array}
         */
        actions: []
    };
};

export const mutations = {
    [SET_APP_HEADER](state, appHeader) {
        state = Object.assign(state, appHeader);
    }
};

export const actions = {

    /**
     * 设置顶部导航条
     *
     * @param {Function} commit commit
     * @param {Object} appHeader appHeader
     */
    setAppHeader({commit}, appHeader) {
        commit(SET_APP_HEADER, appHeader);
    }
};
