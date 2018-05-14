/**
 * 用户界面盒子列表
 */

export let state = () => {
    return {
        boxList1: [
            {
                boxId: 1,
                name: '关注',
                icon: 'star',
                route: {
                    path: '/collection'
                }
            },
            {
                boxId: 2,
                name: '我的文章',
                icon: 'library_books',
                route: {
                    path: '/user/articleList'
                }
            },
            {
                boxId: 3,
                name: '发起的讨论',
                icon: 'message',
                route: {
                    path: '/companion/'
                }
            },
            {
                boxId: 4,
                name: '我的主队',
                icon: 'opacity',
                route: {
                    path: '/user/home-team'
                }
            }
        ],
        boxList2: [
            {
                boxId: 1,
                name: '图集',
                icon: 'photo_album',
                route: {
                    path: '/albums'
                }
            },
            {
                boxId: 2,
                name: 'Air值',
                icon: 'opacity',
                route: {
                    path: '/user/reputation'
                }
            },
            {
                boxId: 3,
                name: '募捐',
                icon: 'toys',
                route: {
                    path: '/volunteer'
                }
            },
            {
                boxId: 4,
                name: '设置',
                icon: 'settings',
                route: {
                    path: '/setting'
                }
            },
            {
                boxId: 5,
                name: '意见反馈',
                icon: 'settings',
                route: {
                    path: '/setting'
                }
            }
        ]
    };
};;
