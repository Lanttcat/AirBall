/*
 * @author KevinManiac
 * @file 比赛相关信息
 * */

export const state = () => {
    return {
        matchListIndex: []
    }
}

export const mutations = {
    storeMatchList(state, info) {
        state.matchList = info;
    }

}

export const actions = {
    getMatchList() {

    }
}
