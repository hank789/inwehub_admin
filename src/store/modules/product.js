import { getInfo } from '@/api/product'

const state = {
  id: ''
}

const mutations = {
  SET_ID: (state, id) => {
    state.id = id
  }
}

const actions = {
  setId({ commit }, id) {
    return new Promise((resolve, reject) => {
      commit('SET_ID', id)
      resolve()
    })
  },
  getProductId({ commit, state }) {
    return new Promise((resolve, reject) => {
      if (state.id) {
        resolve(state.id)
      } else {
        getInfo().then(response => {
          commit('SET_ID', response.data.id)
          resolve(response.data.id)
        }).catch(error => {
          reject(error)
        })
      }
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
