/**
 * 用户设置列表
 */

export let state = () => {
    return {
        settingList: [
            {
                id: 1,
                name: '个人信息',
                icon: 'folder_open',
                route: {
                    name: 'settingInfo',
                    path: '/setting/userinfo'
                }
            },
            {
                id: 2,
                name: '关于茶途',
                icon: 'folder_open',
                route: ''
            },
            {
                id: 3,
                name: '关于茶途',
                icon: 'folder_open',
                route: {
                    name: 'settingAbout',
                    path: '/setting/appAbout'
                }
            }
        ]
    };
};;
