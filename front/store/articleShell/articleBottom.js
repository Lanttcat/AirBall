/**
 * @file articleBottom module
 * @author lanyixing(lanyixing@live.com)
 */

export const SET_ARTICLE_BOTTOM = 'SET_ARTICLE_BOTTOM';

export const state = () => {
    return {
        btns: [
            {
                name: 'returnBtn',
                icon: '#icon-fanhui1'
            },
            {
                name: 'blank',
                icon: ''
            },
            {
                name: 'zan',
                icon: '#icon-favorite1'
            },
            {
                name: 'comment',
                icon: '#icon-pinglun'
            },
            {
                name: 'celect',
                icon: '#icon-daohang'
            }
        ],
        commentCard: false
    };
};;

export const mutations = {
    isCommentCard(state, isOpen) {
        state.commentCard = isOpen;
    }
};;
