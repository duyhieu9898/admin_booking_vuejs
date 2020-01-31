<template>
  <div>
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">User Information</h3>
      </div>
      <div class="card-body">
        <div class="form-group row">
          <label class="control-label col-lg-3 text-right" for="email">Name:</label>
          <p v-if="!isEdit">{{ currentUser.name }}</p>
          <div v-else class="col-lg-9">
            <input
              v-model="currentUser.name"
              v-validate="'required|min:6|max:18'"
              type="text"
              class="form-control"
              placeholder="Enter email"
              name="username"
            >
            <span v-show="errors.has('username')" class="errors">{{ errors.first('username') }}</span>
          </div>
        </div>
        <div class="form-group row">
          <label class="control-label col-lg-3 text-right" for="email">Email:</label>
          <p v-if="!isEdit">{{ currentUser.email }}</p>
          <div v-else class="col-lg-9">
            <input
              v-model="currentUser.email"
              v-validate="'required|email'"
              type="email"
              class="form-control"
              name="email"
              placeholder="Enter email"
            >
            <span v-show="errors.has('email')" class="errors">{{ errors.first('email') }}</span>
          </div>
        </div>
        <div class="form-group row">
          <label class="control-label col-lg-3 text-right" for="tel">Phone:</label>
          <p v-if="!isEdit">{{ currentUser.phone }}</p>
          <div v-else class="col-lg-9">
            <input
              v-model="currentUser.phone"
              v-validate="'digits:10'"
              type="tel"
              class="form-control"
              name="phone"
              placeholder="Enter Phone"
            >
            <span v-show="errors.has('phone')" class="errors">{{ errors.first('phone') }}</span>
          </div>
        </div>
        <div class="form-group row">
          <label class="control-label col-lg-3 text-right" for="tel">Address:</label>
          <div class="col-lg-9">
            <user-address
              :user_id="currentUser.id"
              :address_id="currentUser.address_id"
              :is_edit="isEdit"
              @address-id="getAddressId"
            />
          </div>
        </div>
        <div class="form-group row">
          <div v-if="!isEdit" class="col-md-12">
            <button type="submit" class="btn btn-success" @click="isEdit = true">Edit</button>
          </div>
          <div v-else class="col-lg-8">
            <button type="submit" class="btn btn-primary" @click="updateUser(currentUser)">Save info</button>
            <button type="submit" class="btn btn-success" @click="isEdit = false">Canel</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* global alertify */
import userAddress from '@/components/commons/UserAddress'

export default {
  name: 'InfoUser',
  components: {
    userAddress
  },
  data () {
    return {
      currentUser: {
        name: '',
        email: '',
        phone: '',
        address_id: null
      },
      isEdit: false,
      counter: 0
    }
  },
  created () {
    this.getCurrentUser()
  },
  methods: {
    getCurrentUser () {
      this.axios
        .get('/getCurrentUser')
        .then(response => {
          this.currentUser = response.data
        })
        .catch(error => {
          console.log(error)
        })
    },
    updateUser (user) {
      console.log(user)
      this.axios
        .put('/api/users/' + user.id, {
          user: user
        })
        .then(response => {
          console.log(response.data)
          this.isEdit = false
          alertify.notify(`UPDATE user with id: ${user.id}`, 'success', 7)
        })
        .catch(errors => {
          console.log(errors.response)
          if (errors.response.data.errors) { this.errors.name = errors.response.data.errors }
        })
    },
    getAddressId (id) {
      this.currentUser.address_id = id
    }
  }
}
</script>
