import Vue from 'vue'
import Vuex from 'vuex'
import jsonData from "@/store/travel.json";

Vue.use(Vuex)

export default new Vuex.Store ({
    state: {
        travel: jsonData,
        buyers: JSON.parse(localStorage.getItem('buyers') || '[]')
    },
    getters: {
        travel: s => s.travel,
        buyers: s => s.buyers[s.buyers.length - 1], //вычисление последнего объекта
    },
    mutations: {
        
        createBuyer(state, buyer) {
            state.buyers.push(buyer)
            localStorage.setItem('buyers', JSON.stringify(state.buyers))
        },
    },
    actions: {
        
        createBuyer({commit}, buyer) {
            commit('createBuyer', buyer)
        },
    },
})