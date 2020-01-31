<template>
  <div class="page-content">
    <div class="page-bar">
      <div class="page-title-breadcrumb">
        <div class="pull-left">
          <div class="page-title">User</div>
        </div>
        <ol class="breadcrumb page-breadcrumb pull-right">
          <li>
            <i class="fa fa-home" />&nbsp;
            <router-link :to="{ name: 'dash-board'}" class="title">Home</router-link>&nbsp;
            <i class="fa fa-angle-right" />
          </li>
          <li class="active">User</li>
        </ol>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-12">
        <div class="card-box">
          <div class="card-head">
            <header>User Infomation</header>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-lg-12 user-management">
                <div class="list_user table-responsive">
                  <table class="table table-hover">
                    <thead>
                      <tr>
                        <td>ID</td>
                        <td>Name</td>
                        <td>Email</td>
                        <td>Phone</td>
                        <td>Role</td>
                        <td v-if="checkIsAdmin">Action</td>
                      </tr>
                    </thead>
                    <tbody v-if="getListUser.length">
                      <tr v-for="(user, index) in getListUser" :key="user.id">
                        <td>{{ user.id }}</td>
                        <td v-if="!user.isEdit">{{ user.name }}</td>
                        <td v-else>
                          <input
                            v-model="user.name"
                            v-validate="'required|min:6|max:18'"
                            name="name"
                            type="text"
                            class="form-control"
                            :data-vv-scope="'user_'+ user.id"
                          >
                          <span class="errors">{{ errors.first(`user_${user.id}.name`) }}</span>
                        </td>
                        <td v-if="!user.isEdit">{{ user.email }}</td>
                        <td v-else>
                          <input
                            v-model="user.email"
                            v-validate="'required|email'"
                            name="email"
                            type="text"
                            class="form-control"
                            :data-vv-scope="'user_'+ user.id"
                          >
                          <span class="errors">{{ errors.first(`user_${user.id}.email`) }}</span>
                        </td>
                        <td v-if="!user.isEdit">{{ user.phone }}</td>
                        <td v-else>
                          <input
                            v-model="user.phone"
                            v-validate="'digits:10'"
                            name="phone"
                            class="form-control"
                            type="text"
                            :data-vv-scope="'user_'+ user.id"
                          >
                          <span class="errors">{{ errors.first(`user_${user.id}.phone`) }}</span>
                        </td>
                        <td v-if="!user.isEdit">
                          <span v-for="role in user.roles" :key="role.id">{{ role.name }}</span>
                        </td>
                        <td v-else>
                          <div v-if="user.roles.length">
                            <div v-for="role in user.roles" :key="role.id">
                              <select v-model="role.name" class="form-control">
                                <option value="customer">Customer</option>
                                <option value="owner">Owner</option>
                                <option value="admin">Admin</option>
                              </select>
                            </div>
                          </div>
                        </td>
                        <td v-if="checkIsAdmin&&!user.isEdit">
                          <button class="btn btn-info" @click="user.isEdit = true">
                            <i class="fa fa-pencil" aria-hidden="true" />
                          </button>
                          <button class="btn btn-danger" @click="deleteUser({'userID':user.id, index})">
                            <i class="fa fa-trash" aria-hidden="true" />
                          </button>
                        </td>
                        <td v-else-if="checkIsAdmin">
                          <button class="btn btn-success" @click="callUpdateUser(user)">Save</button>
                          <button class="btn btn-danger" @click="user.isEdit = false ">Cancel</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div v-if="checkIsAdmin" class="create-user">
                  <div class="row">
                    <div class="col-md-3">
                      <input
                        v-model="userCreate.name"
                        v-validate="'required|min:6|max:18'"
                        name="username_create"
                        type="text"
                        class="form-control"
                        placeholder="Name..."
                      >
                      <span class="errors">{{ errors.first('username_create') }}</span>
                    </div>
                    <div class="col-md-3">
                      <input
                        v-model="userCreate.email"
                        v-validate="'required|email'"
                        name="email_create"
                        type="email"
                        class="form-control"
                        placeholder="User email..."
                        autocomplete="true"
                      >
                      <span class="errors">{{ errors.first('email_create') }}</span>
                    </div>
                    <div class="col-md-2">
                      <input
                        v-model="userCreate.phone"
                        v-validate="'required|digits:10'"
                        name="phone_create"
                        type="tel"
                        class="form-control"
                        placeholder="User Phone..."
                        autocomplete="true"
                      >
                      <span class="errors">{{ errors.first('phone_create') }}</span>
                    </div>
                    <div class="col-md-2">
                      <select v-model="userCreate.role" class="form-control">
                        <option value="customer">Customer</option>
                        <option value="owner">Owner</option>
                        <option value="admin">Admin</option>
                      </select>
                    </div>
                    <div class="col-md-2">
                      <button class="btn btn-primary" @click="callCreateUser()">Create</button>
                      <button class="btn btn-warning" @click="resetFormUserCreate()">Reset</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* global alertify */
import { mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
      userCreate: {
        name: null,
        email: null,
        phone: null,
        role: 'customer'
      }
    }
  },
  computed: {
    ...mapGetters([
      'currentUser',
      'getListUser'
    ]),
    checkIsAdmin () {
      let check = false
      if (this.currentUser.roles) {
        this.currentUser.roles.forEach(role => {
          if (role.name === 'admin') {
            check = true
          }
        })
      }
      return check
    }
  },
  watch: {
    currentUser () {
      setInterval(() => {
        console.log('lenght', this.getListUser.length)
      }, 1000)
    }
  },
  methods: {
    ...mapActions([
      'createUser',
      'callAPIUpdateUser',
      'deleteUser'
    ]),
    resetFormUserCreate () {
      this.$validator.reset()
      this.userCreate = {
        name: null,
        email: null,
        phone: null,
        role: 'customer'
      }
    },
    async callCreateUser () {
      await this.$validator.validate()
      if (this.errors.any()) {
        alertify.notify('You must fix all errors in the form ', 'error', 7)
        return
      }
      this.createUser(this.userCreate)
    },
    async callUpdateUser (user) {
      try {
        await this.$validator.validateAll('user-' + user.id)
        if (this.errors.any()) {
          alertify.notify('You must fix all errors in the form ', 'error', 7)
          return
        }
        await this.callAPIUpdateUser(user)
        user.isEdit = false
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>
