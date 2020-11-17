import { getMemberList } from '../../util/axios'

const state = {
    memberList: []
}
const mutations = {
    REQ_MEMBER(state,payload){
        state.memberList = payload
    }
}

const getters = {
    getMemberList(state){
        return state.memberList
    }
}
const actions = {
    getMemberListAction({commit}){
        getMemberList()
        .then(res => {
            console.log(res)
            if(res.data.code === 200){
                commit('REQ_MEMBER',res.data.list)
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
    namespaced:true
}