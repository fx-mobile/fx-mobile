export default {
    state: {
        badgeNum: sessionStorage.getItem('message_badge_num') || 0
    },
    mutations: {
        SET_BADGE_NUM: (state, num) => {
            sessionStorage.setItem('message_badge_num', num);
            state.badgeNum = num
        }
    },
    actions: {
        SetBadgeNum({ commit }, num) {
            commit('SET_BADGE_NUM', num)
        }
    }
}