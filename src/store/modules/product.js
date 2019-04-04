import { getInfo } from '@/api/product'
import { Message } from 'element-ui'

const state = {
  product: null
}

const mutations = {
  SET_PRODUCT: (state, product) => {
    state.product = product
  }
}

const actions = {
  clear({ commit }) {
    return new Promise((resolve, reject) => {
      commit('SET_PRODUCT', null)
      resolve()
    })
  },
  setProduct({ commit }, product) {
    return new Promise((resolve, reject) => {
      commit('SET_PRODUCT', product)
      resolve()
    })
  },
  getProductInfo({ commit, state }, succssCallback) {
    if (state.product) {
      succssCallback(state.product)
    } else {
      getInfo().then(response => {
        if (response.code === 6122) {
          Message({
            message: response.message,
            type: 'error'
          })
          this.dispatch('user/logout')

          setTimeout(() => {
            window.location.reload()
          }, 2000)
        }

        commit('SET_PRODUCT', response.data)
        succssCallback(response.data)
      }).catch(error => {
        Message({
          message: error,
          type: 'error'
        })
      })
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
