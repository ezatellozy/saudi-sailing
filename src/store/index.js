import Vue from 'vue'
import Vuex from 'vuex'
import Cookies from 'js-cookie'
import axios from 'axios'
// import Toasted from 'vue-toasted'

Vue.use(Vuex)
// const toasted = Toasted()

export default new Vuex.Store({
  state: {
    status: null,
    resErrors: null,
    loading: false,
    scroll: '10',
    locale: Cookies.get('locale') || 'ar',
    token: sessionStorage.getItem('token') || null,
    user: JSON.parse(sessionStorage.getItem('user')) || '',
  },
  mutations: {
    getScrollValue(state, paylod) {
      state.scroll = paylod
    },
    setLocale(state, paylod) {
      state.locale = paylod
    },
    setUser(state, payload) {
      state.user = payload
    },
    setToken(state, payload) {
      state.token = payload
    },
    loading(state, payload) {
      state.loading = payload
    },
    status(state, payload) {
      state.status = payload
    },
    resErrors(state, payload) {
      state.resErrors = payload
    },
  },
  actions: {
    login({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit('loading', true)
        // commit('auth_request')
        axios({
          url: 'users/login',
          data: {
            username: user.userName || user.email,
            password: user.password,
          },
          method: 'POST',
        })
          .then((resp) => {
            console.log(resp)
            commit('status', resp.data.status)
            sessionStorage.setItem('user', JSON.stringify(resp.data.user))
            sessionStorage.setItem('token', resp.data.token)
            commit('setUser', resp.data.user)
            commit('setToken', resp.data.token)
            setTimeout(() => {
              window.location.reload()
            }, 1000)
            resolve(resp)
          })
          .catch((errors) => {
            if (errors.response.status == 401) {
              commit('status', errors.response.data.message)
            }
            Cookies.remove('token')
            reject(errors)
          })
          .finally(() => {
            commit('loading', false)
          })
      })
    },
    register({ commit, dispatch }, user) {
      return new Promise((resolve, reject) => {
        commit('loading', true)
        axios({
          url: 'users/signup',
          data: {
            name: user.name,
            email: user.email,
            password: user.password,
            mobile: user.mobile,
          },
          method: 'POST',
        })
          .then((resp) => {
            commit('resErrors', null)
            commit('status', null)

            if (resp.data.status == 'Failure') {
              commit('resErrors', resp.data.errors)
              commit('status', resp.data.message)
            }
            if (resp.data.status == 'Success') {
              dispatch('login', user)
            }
            resolve(resp)
          })
          .catch((errors) => {
            if (errors.response.status == 401) {
              commit('status', errors.response.data.message)
            }
            Cookies.remove('token')
            reject(errors)
          })
          .finally(() => {
            commit('loading', false)
          })
      })
    },
    logout() {},
  },
  modules: {},
  getters: {
    isLogedIn(state) {
      return !!state.token
    },
    loading: (state) => state.loading,
    status: (state) => state.status,
    resErrors: (state) => state.resErrors,
  },
})
