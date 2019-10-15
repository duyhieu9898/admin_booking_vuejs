import apiUrl from "../../constants/apiUrl";

const state = {
  listUser: null,
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
};

const getters = {
  listUser(state) {
    return state.listUser
  },
  currentUser(state) {
    return state.currentUser
  },

};

const actions = {
 getCurrentUser({ commit }) {
    return new Promise(async (resolve, reject) => {
      try {
        let response = await this._vm.axios.get(apiUrl.GET_CURRENT_USER);
        let currentUser = response.data;
        commit('SET_CURRENT_USER', currentUser)
        resolve()
      } catch (error) {
        reject('get-current-user', error)
      }
    })

  },
  getListUser({ commit }) {
    return new Promise(async (resolve, reject) => {
      try {
        let response = await this._vm.axios.get(apiUrl.GET_USERS)
        const listUser = response.data;
        listUser.forEach(user => {
          this._vm.$set(user, "isEdit", false);
        });
        commit('SET_LIST_USER', listUser)
        resolve()
      } catch (error) {
        reject('get-list-user', error)
      }
    })
  },
  async createUser({ commit }, userItem) {
    try {
      let response = await this._vm.axios.post(apiUrl.CREATE_USER, userItem.id);
      //send notify
      alertify.notify(`CREATE success user with name is "${userItem.name}"`, "success", 7);
      //update list user side client
      userItem.id = response.data.userId;
      userItem.roles = [{ name: userItem.role }];
      this._vm.$set(userItem, "isEdit", false);
      commit('INSERT_USER_ITEM', userItem)
    } catch (error) {
      console.log(error.response);
      alertify.notify('There was an unexpected error', "error", 7);
    }
  },
  async updateUser(user) {
    try {
      await this._vm.axios.put(apiUrl.UPDATE_USER_BY_ID.replace(':id',  user.id), {
        name: user.name,
        email: user.email,
        phone: user.phone,
        roleId: user.roles[0].id
      });
    } catch (error) {
      console.log(error.response);
      alertify.notify('There was an unexpected error', "error", 7);
    }
  },
  async deleteUser({ commit }, user, index) {
    try {
      await this.axios.delete(apiUrl.DELETE_USER_BY_ID.replace(':id', user.id));
      alertify.notify("DELETE user with id is " + user.id, "warning", 7);
      commit('REMOVE_USER_ITEM', index)
    } catch (error) {
      alertify.notify('There was an unexpected error', "error", 7);
      console.log(errors.response);
    }
  },
};

const mutations = {
  SET_LIST_USER(state, data) {
    state.listUser = data
  },
  SET_CURRENT_USER(state, data) {
    state.currentUser = data
  },
  INSERT_USER_ITEM(state, userItem) {
    state.listUser.push(userItem)
  },
  REMOVE_USER_ITEM(state, index) {
    state.listUser.splice(index, 1);
  }
};

export default {
  state,
  actions,
  mutations,
  getters,
};
