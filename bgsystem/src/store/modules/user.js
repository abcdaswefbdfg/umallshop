import { getUserList, getUserCount } from '../../util/axios'

const state = {
    userList: [],
    pageSize: 2,
    total: 0,
    page: 1
}
const mutations = {
    REQ_USER(state, payload) {
        state.userList = payload
    },
    REQ_COUNT(state, payload) {
        state.total = payload
    },
    EDIT_PAGE(state, payload) {
        state.page = payload
    }
}

const getters = {
    getUserList(state) {
        return state.userList
    },
    getUserCount(state) {
        return state.total
    },
    getUserSize(state) {
        return state.pageSize
    },
    getUserPage(state) {
        return state.page
    },

}
const actions = {
    getUserListAction(context) {
        getUserList({
            size: context.state.pageSize,
            page: context.state.page
        }).then(res => {
            console.log(res, 'efegt');
            if (res.data.code === 200) {
                let data = res.data.list ? res.data.list : []
                context.commit("REQ_USER", data);
                if (context.state.page != 1 && data.length === 0) {
                    //重新调取修改页码的行动
                    context.dispatch('getEditPageAction', context.state.page - 1)
                    //重新调取列表
                    context.dispatch('getUserListAction')
                    return
                }
            }
        })
    },
    getUserCountAction({ commit }) {
        getUserCount().then(res => {
            // console.log(res,'xingdong');
            if (res.data.code === 200) {
                commit('REQ_COUNT', res.data.list[0].total)
            }
        })
    },
    getEditPageAction({ commit, dispatch }, payload) {
        // console.log(payload);
        commit('EDIT_PAGE', payload);
        dispatch('getUserListAction');
    }

}
export default {
    state,
    getters,
    mutations,
    actions,
    namespaced: true
}