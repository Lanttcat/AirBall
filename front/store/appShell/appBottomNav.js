/**
 * @file appShell/appBottomNav module
 * @author lavas
 */

export const SET_APP_BOTTOM = 'SET_APP_BOTTOM';

export const state = () => {
    return {

        /**
         * 是否展示顶部导航栏
         *
         * @type {boolean}
         */
        show: true,

        /**
         * 导航按钮列表
         *
         * @type {Array.<Object>}
         */
        navs: [
            {
                // 按钮的名字
                name: 'index',

                // 显示的 icon
                icon: '#icon-basketball-',

                // 显示的文字
                text: '办公',

                // 是否是当前激活的
                active: true,

                // 路由
                route: {
                    name: 'index',
                    path: '/'
                },
                center: false
            },
            {
                name: 'information',
                icon: '#icon-lanqiuchang',
                text: '选秀',
                route: {
                    name: 'information',
                    path: '/information'
                },
                center: false
            },
            {
                name: 'edit',
                icon: '#icon-write-copy',
                text: '',
                route: {
                    name: 'edit',
                    path: '/edit'
                },
                center: true
            },
            {
                name: 'companion',
                icon: '#icon-tactics',
                text: '控球',
                route: {
                    name: 'companion',
                    path: '/companion'
                },
                center: false
            },
            {
                name: 'User',
                icon: '#icon-basketball-jersey',
                text: '球员',
                route: {
                    name: 'user',
                    path: '/user'
                },
                center: false
            }
        ]
    };
};
