import { getSpecsList, getSpecsCount } from '../../util/axios'

const state = {
    specsList: [],
    pageSize: 3,
    total: 0,
    page: 1
}
const mutations = {
    REQ_SPECS(state, payload) {
        state.specsList = payload
    },
    REQ_COUNT(state, payload) {
        state.total = payload
    },
    EDIT_PAGE(state, payload) {
        state.page = payload
    }
}

const getters = {
    getSpecsList(state) {
        return state.specsList
    },
    getSpecsCount(state) {
        return state.total
    },
    getSpecsSize(state) {
        return state.pageSize
    },
    getSpecsPage(state) {
        return state.page
    },
    
}
const actions = {
    getSpecsListAction(context) {
        getSpecsList({
            size: context.state.pageSize,
            page: context.state.page
        }).then(res => {
            console.log(res, 'efegt');
            if (res.data.code === 200) {
                let data = res.data.list ? res.data.list : []
                context.commit("REQ_SPECS", data);
                if (context.state.page != 1 && data.length === 0) {
                    //重新调取修改页码的行动
                    context.dispatch('getEditPageAction', context.state.page - 1)
                    //重新调取列表
                    context.dispatch('getSpecsListAction')
                    return
                }
            }
        })
    },
    getSpecsCountAction({ commit }) {
        getSpecsCount().then(res => {
            // console.log(res,'xingdong');
            if (res.data.code === 200) {
                commit('REQ_COUNT', res.data.list[0].total)
            }
        })
    },
    getEditPageAction({commit,dispatch},payload) {
        // console.log(payload);
        commit('EDIT_PAGE', payload);
        dispatch('getSpecsListAction');
    }

}
export default {
    state,
    getters,
    mutations,
    actions,
    namespaced: true
}