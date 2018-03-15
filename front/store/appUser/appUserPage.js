/**
 * 用户界面盒子列表
 */

export let state = () => {
    return {
        boxList: [
            {
                boxId: 1,
                name: '我的收藏',
                icon: '',
                route: {
                    path: '/collection'
                }
            },
            {
                boxId: 2,
                name: '我的攻略',
                icon: '',
                route: {
                    path: '/user/articleList'
                }
            },
            {
                boxId: 3,
                name: '陪玩',
                icon: '',
                route: {
                    path: '/companion/'
                }
            },
            {
                boxId: 4,
                name: '图集',
                icon: '',
                route: {
                    path: '/albums'
                }
            },
            {
                boxId: 5,
                name: '志愿者',
                icon: '',
                route: {
                    path: '/volunteer'
                }
            },
            {
                boxId: 6,
                name: '设置',
                icon: '',
                route: {
                    path: '/setting'
                }
            }
        ]
    };
};;
