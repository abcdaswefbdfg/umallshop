import { getMenuList } from '../../util/axios'

const state = {
    menuList: []
}
const mutations = {
    REQ_MENU(state,payload){
        state.menuList = payload
    }
}

const getters = {
    getMenuList(state){
        return state.menuList
    }
}
const actions = {
    getMenuListAction({commit}){
        getMenuList({
            istree: true
        })
        .then(res => {
            console.log(res)
            if(res.data.code === 200){
                commit('REQ_MENU',res.data.list)
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