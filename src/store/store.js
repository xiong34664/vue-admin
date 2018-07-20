import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const state = {
  username: 'xxx'
}

const mutations = {
  setUser: (state, user) => {
    state.username = user
    localStorage.username = user
  }
}
const actions = {}
const getters = {
  username: state => localStorage.username
}
export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
