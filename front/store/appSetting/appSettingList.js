/**
 * 用户设置列表
 */

export let state = () => {
    return {
        settingList: [
            {
                id: 1,
                name: '个人信息',
                icon: 'sent',
                route: {
                    name: 'settingInfo',
                    path: '/setting/userinfo'
                }
            },
            {
                id: 2,
                name: '关于茶途',
                icon: 'sent',
                route: ''
            },
            {
                id: 3,
                name: '关于茶途',
                icon: 'sent',
                route: {
                    name: 'settingAbout',
                    path: '/setting/appAbout'
                }
            },
            {
                id: 4,
                name: '退出当前账号',
                icon: 'sent'
            }
        ]
    };
};;
