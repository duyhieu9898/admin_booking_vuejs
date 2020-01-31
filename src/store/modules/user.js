/* global alertify */
import apiUrl from '../../constants/apiUrl'
import axios from 'axios'
import Vue from 'vue'
import { checkStatusError } from '@/commons/request'

const state = {
  listUser: [],
  currentUser: {
    id: null,
    name: null,
    role: null,
    email: null,
    phone: null,
    address_id: null,
    api_token: null,
    email_verified_at: null,
    created_at: null,
    updated_at: null
  }
}

const getters = {
  getListUser (state) {
    return state.listUser
  },
  currentUser (state) {
    return state.currentUser
  },
  apiToken (state) {
    return state.api_token
  }
}

const actions = {
  setCurrentUser ({ commit }) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await this._vm.axios.get(apiUrl.GET_CURRENT_USER)
        const currentUser = response.data
        commit('SET_CURRENT_USER', currentUser)
        resolve(currentUser)
      } catch (error) {
        checkStatusError(error.response)
      }
    })
  },
  setListUser ({ commit }) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await this._vm.axios.get(apiUrl.GET_USERS)
        const listUser = response.data
        listUser.forEach(user => {
          this._vm.$set(user, 'isEdit', false)
        })
        commit('SET_LIST_USER', listUser)
        resolve(listUser)
      } catch (error) {
        checkStatusError(error.response)
      }
    })
  },
  async createUser ({ commit }, userItem) {
    try {
      const response = await this._vm.axios.post(apiUrl.CREATE_USER, userItem)
      // send notify
      alertify.notify(`CREATE success user with name is "${userItem.name}"`, 'success', 7)
      // update list user side client
      userItem.id = response.data.userId
      userItem.roles = [{ name: userItem.role }]
      this._vm.$set(userItem, 'isEdit', false)
      commit('INSERT_USER_ITEM', userItem)
    } catch (error) {
      alertify.notify('There was an unexpected error', 'error', 7)
      // debug
      const resError = error.response ? error.response : error
      console.log(resError)
    }
  },
  async callAPIUpdateUser ({ commit }, user) {
    return new Promise(async (resolve, reject) => {
      try {
        await this._vm.axios.put(apiUrl.UPDATE_USER_BY_ID.replace(':id', user.id), {
          name: user.name,
          email: user.email,
          phone: user.phone,
          roleId: user.roles[0].id
        })
        alertify.notify('UPDATE success user with id is "user.id"', 'success', 7)
        resolve('callAPIUpdateUser success')
      } catch (error) {
        alertify.notify('There was an unexpected error', 'error', 7)
        reject('callAPIUpdateUser', error)
      }
    })
  },
  async deleteUser ({ commit }, data) {
    try {
      const { userID, index } = data
      await this._vm.axios.delete(apiUrl.DELETE_USER_BY_ID.replace(':id', userID))
      alertify.notify('DELETE user with id is ' + userID, 'warning', 7)
      commit('REMOVE_USER_ITEM', index)
    } catch (error) {
      alertify.notify('There was an unexpected error', 'error', 7)
      // debug
      const resError = error.response ? error.response : error
      console.log(resError)
    }
  },
  setApiToken ({ commit }, token) {
    Vue.prototype.$token = token
    axios.defaults.headers.common.Authorization = `Bearer ${token}`
    commit('SET_API_TOKEN', token)
  }
}

const mutations = {
  SET_LIST_USER (state, data) {
    state.listUser = data
  },
  SET_CURRENT_USER (state, data) {
    state.currentUser = data
  },
  INSERT_USER_ITEM (state, userItem) {
    state.listUser.push(userItem)
  },
  REMOVE_USER_ITEM (state, index) {
    state.listUser.splice(index, 1)
  },
  SET_API_TOKEN (state, token) {
    state.api_token = token
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
