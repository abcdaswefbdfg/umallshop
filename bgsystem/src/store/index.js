import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import menu from './modules/menu'
import role from './modules/role'
import user from './modules/user'
import cate from './modules/cate'
import specs from './modules/specs'
import member from './modules/member'
import banner from './modules/banner'
import seck from './modules/seck'
import goods from './modules/goods'
export default new Vuex.Store({
    state: {
        userInfo: sessionStorage.getItem('userInfo') ? JSON.parse(sessionStorage.getItem('userInfo')) : null
    },
    getters: {
        getUserInfo(state){
            return state.userInfo;
        }
    },
    mutations: {
        REQ_USERINFO(state,payload){
            state.userInfo = payload;
            if(payload){
                sessionStorage.setItem('userInfo',JSON.stringify(payload))
            }else{
                sessionStorage.removeItem('userInfo')
            }
        }
    },
    actions: {
        changeUserInfoAction({commit},payload){
            commit('REQ_USERINFO',payload);
        }
    },
    modules: {
        menu,
        role,
        user,
        cate,
        specs,
        member,
        banner,
        seck,
        goods
    }
})