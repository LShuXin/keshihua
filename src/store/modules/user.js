import { login, logout, getInfo, login2 } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const state = {
  token: getToken(),
  name: '',
  avatar: ''
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        const { data } = response
        // console.log(response)
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        commit('SET_NAME', data.user.name)
        commit('SET_AVATAR', '')
        resolve(response)
      }).catch(error => {
        // console.log(error)
        reject(error)
      })
    })
  },

  login2({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login2({ phone: username.trim(), code: password }).then(response => {
        const { data } = response
        // console.log(response)
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        commit('SET_NAME', data.user.name)
        commit('SET_AVATAR', '')
        resolve(response)
      }).catch(error => {
        console.log(error)
        reject(error)
      })
    })
  },
  // get user info
  //   getInfo({ commit, state }) {
  //     return new Promise((resolve, reject) => {
  //      // getInfo(state.token).then(response => {
  //         const { data } = response
  //         console.log(response)
  //         if (!data) {
  //           reject('Verification failed, please Login again.')
  //         }

  //         const { name, avatar } = data

  //         commit('SET_NAME', name)
  //         commit('SET_AVATAR', avatar)
  //         resolve(data)
  //       }).catch(error => {
  //         reject(error)
  //       })
  //  //   })
  //   },

  // user logout
  // logout({ commit, state }) {
  //   return new Promise((resolve, reject) => {
  //     logout(state.token).then(() => {
  //       commit('SET_TOKEN', '')
  //       removeToken()
  //       resetRouter()
  //       resolve()
  //     }).catch(error => {
  //       reject(error)
  //     })
  //   })
  // },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      removeToken()
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

