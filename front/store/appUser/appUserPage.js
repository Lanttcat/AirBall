/**
 * 用户界面盒子列表
 */

export let state = () => {
    return {
        boxList1: [
            {
                boxId: 1,
                name: '关注',
                icon: '',
                route: {
                    path: '/collection'
                }
            },
            {
                boxId: 2,
                name: '我的文章',
                icon: '',
                route: {
                    path: '/user/articleList'
                }
            },
            {
                boxId: 3,
                name: '发起的讨论',
                icon: '',
                route: {
                    path: '/companion/'
                }
            },
            {
                boxId: 4,
                name: '声望',
                icon: '',
                route: {
                    path: '/user/reputation'
                }
            }
        ],
        boxList2: [
            {
                boxId: 1,
                name: '图集',
                icon: '',
                route: {
                    path: '/albums'
                }
            },
            {
                boxId: 2,
                name: 'Air值',
                icon: '',
                route: {
                    path: '/albums'
                }
            },
            {
                boxId: 3,
                name: '募捐',
                icon: '',
                route: {
                    path: '/volunteer'
                }
            },
            {
                boxId: 4,
                name: '设置',
                icon: '',
                route: {
                    path: '/setting'
                }
            }
        ]
    };
};;
