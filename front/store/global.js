/**
 * @file pageTransition module
 * @author lavas
 */

//  const setShellStyleControl = 'SETSHELLSTYLECONTROL';
export const state = () => {
    return {
        message: {
            msgSwitch: false,
            msgText: ''
        },
        shellStyleControl: {
            // 1: 默认 2：简单 3： 无
            header: 1,
            // 1: 默认 2：文章 3： 无
            footer: 1
        },
        shellStyleConfig: {
            'index': {
                header: 1,
                footer: 1
            },
            'information': {
                header: 1,
                footer: 1
            },
            'edit': {
                header: 3,
                footer: 3
            },
            'companion': {
                header: 1,
                footer: 1
            },
            'user': {
                header: 1,
                footer: 1
            },
            'articleDetail': {
                header: 1,
                footer: 1
            },
            'collection': {
                header: 1,
                footer: 1
            },
            'Volunteer': {
                header: 1,
                footer: 1
            },
            'editReview': {
                header: 3,
                footer: 3
            },
            'login': {
                header: 3,
                footer: 3
            },
            'mainStreet': {
                header: 3,
                footer: 1
            }
        }
    };
};

export const mutations = {
    setMsgTip(state, info) {
        state.message.msgSwitch = info.msgSwitch;
        state.message.msgText = info.msgText;
    },
    shellStyle(state, info) {
        state.shellStyleControl.header = info.header;
        state.shellStyleControl.footer = info.footer;
    }
};

export const actions = {

    setShellStyleControl({commit}, info) {
        commit('shellStyle', info);
    }
};
