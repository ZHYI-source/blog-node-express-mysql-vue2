import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { resetRouter } from '@/router'
import Vue from 'vue'

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  userId: '',
  orgId: '',
  introduction: '',
  roles: [],
  perms: []
}

const mutations = {
  SET_TOKEN: (state, token) => {
    Vue.set(state,'token',token)
  },
  SET_INTRODUCTION: (state, introduction) => {
    Vue.set(state,'introduction',introduction)
  },
  SET_NAME: (state, name) => {
    Vue.set(state,'name',name)
  },
  SET_USERID: (state, userId) => {
    Vue.set(state,'userId',userId)
  },
  SET_USERNICKNAME: (state, userNickName) => {
    Vue.set(state,'userNickName',userNickName)
  },
  SET_ORGID: (state, orgId) => {
    Vue.set(state,'orgId',orgId)
  },
  SET_ORGNAME: (state, orgName) => {
    Vue.set(state,'orgName',orgName)
  },
  SET_AVATAR: (state, avatar) => {
    Vue.set(state,'avatar',avatar)
  },
  SET_ROLES: (state, roles) => {
    Vue.set(state,'roles',roles)
  },
  SET_PERMS: (state, perms) => {
    Vue.set(state,'perms',perms)
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { loginAccount, userPassword,verifyCode,key } = userInfo
    return new Promise((resolve, reject) => {
      login({ loginAccount: loginAccount.trim(), userPassword: userPassword,verifyCode,key}).then(response => {
        const { data } = response.data
        console.log(response)
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response.data
        if (!data) {
          reject('Verification failed, please Login again.')
        }

        const { roles, name, userId,userNickName, orgId, orgName, avatar, introduction } = data

        // roles must be a non-empty array
        if (!roles || roles.length <= 0) {
          reject('getInfo: roles must be a non-null array!')
        }
        if (data.perms && data.perms.length > 0) { // 验证返回的perms是否是一个非空数组
          commit('SET_PERMS', data.perms)
        } else {
          reject('getInfo: perms must be a non-null array !')
        }

        commit('SET_ROLES', roles)
        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        commit('SET_INTRODUCTION', introduction)
        commit('SET_USERID', userId)
        commit('SET_USERNICKNAME', userNickName)
        commit('SET_ORGID', orgId)
        commit('SET_ORGNAME', orgName)
        console.log('orgName')
        console.log(orgName)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        commit('SET_PERMS', [])
        removeToken()
        resetRouter()

        // reset visited views and cached views
        // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
        dispatch('tagsView/delAllViews', null, { root: true })

        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 前端 登出
  FedLogOut({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      removeToken()
      resolve()
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  },

  // dynamically modify permissions
  changeRoles({ commit, dispatch }, role) {
    return new Promise(async resolve => {
      const token = role + '-token'

      commit('SET_TOKEN', token)
      setToken(token)

      const { roles } = await dispatch('getInfo')

      resetRouter()

      // generate accessible routes map based on roles
      const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })

      // dynamically add accessible routes
      router.addRoutes(accessRoutes)

      // reset visited views and cached views
      dispatch('tagsView/delAllViews', null, { root: true })

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
