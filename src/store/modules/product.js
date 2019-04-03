import { getInfo } from '@/api/product'

const state = {
  product: null
}

const mutations = {
  SET_PRODUCT: (state, product) => {
    state.product = product
  }
}

const actions = {
  setProduct({ commit }, product) {
    return new Promise((resolve, reject) => {
      commit('SET_PRODUCT', product)
      resolve()
    })
  },
  getProductInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      if (state.product) {
        resolve(state.product)
      } else {
        getInfo().then(response => {
          commit('SET_PRODUCT', response.data)
          resolve(response.data)
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
