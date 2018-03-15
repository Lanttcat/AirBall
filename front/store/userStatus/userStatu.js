/**
 * 用户状态
 */

export let state = () => {
    return {

        /**
         * 用户登录状态 1. 登录 0： 未登录 2: 异常，需要设定自动注销
         */
        userInfo: {
            status: 1,
            uphone: 1111,
            uid: '',
            uname: '',
            uage: null,
            uSite: '',
            uIntro: '',
            volunteer: {
                volId: 111,
                volTeam: {
                    teamId: 88,
                    teamName: '',
                    teamMember: 222
                }
            }
        }
    };
};;

export const mutations = {
    syncUserInfo(state, userData) {
        Object.assign(state.userInfo, userData);
    }
};

export const actions = {

    /**
     * 同步用户信息
     *
     * @param {Function} commit commit
     * @param {Object} appHeader appHeader
     */
    setUserInfo({commit}, userData) {
        // console.log(userData);
        commit('syncUserInfo', userData);
    }
};
