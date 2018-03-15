/**
 * @file pageTransition module
 * @author lavas
 */

const setMsgTip = 'SETMSGTIP';
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
        }
    };
};

export const mutations = {
    [setMsgTip](state, info) {
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
