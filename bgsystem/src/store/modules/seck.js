import { getSeckList } from '../../util/axios'

const state = {
    seckList: []
}
const mutations = {
    REQ_SECK(state, payload) {
        state.seckList = payload
    }
}

const getters = {
    getSeckList(state) {
        return state.seckList
    }
}
const actions = {
    getSeckListAction({ commit }) {
        getSeckList()
            .then(res => {
                console.log(res)
                if (res.data.code === 200) {
                    commit('REQ_SECK', res.data.list)
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