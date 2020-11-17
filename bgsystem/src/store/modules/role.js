import { getRoleList } from '../../util/axios'

const state = {
    roleList: []
}

const getters = {
    getRoleList(state) {
        return state.roleList
    }
}

const mutations = {
    REQ_ROLE(state, payload) {
        state.roleList = payload
    }
}
const actions = {
    getRoleListAction({ commit }) {
        getRoleList()
            .then(res => {
                if (res.data.code === 200) {
                    commit('REQ_ROLE', res.data.list)
                }

            })
            .catch(err => console.log(err))
    }
}

export default {
    state,
    getters,
    mutations,
    actions,
    namespaced: true
}