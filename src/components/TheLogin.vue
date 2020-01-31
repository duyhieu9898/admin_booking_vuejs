<template>
  <div class="limiter">
    <div class="container-login100 page-background">
      <div class="wrap-login100">
        <span class="login100-form-logo">
          <i class="zmdi zmdi-flower" />
        </span>
        <span class="login100-form-title p-b-34 p-t-27">
          Log in
        </span>
        <div class="wrap-input100 validate-input" data-validate="Enter email">
          <input v-model="email" class="input100" type="text" placeholder="Username">
        </div>
        <div class="wrap-input100 validate-input" data-validate="Enter password">
          <input v-model="password" class="input100" type="password" placeholder="Password">
        </div>

        <div class="container-login100-form-btn">
          <button class="login100-form-btn" @click="callApiLogin()">
            Login
          </button>
        </div>
        <div class="text-center p-t-90" />
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      email: 'admin@example.com',
      password: '123456'
    }
  },
  methods: {
    ...mapActions([
      'setApiToken',
      'setListUser',
      'setCurrentUser'
    ]),
    async callApiLogin () {
      try {
        const response = await this.axios.post('api/admin/login', { 'email': this.email, 'password': this.password })
        const token = response.data
        localStorage.setItem('api_token', token)
        this.setApiToken(token)
        this.$router.push({ name: 'dash-board' })
      } catch (error) {
        console.log(error)
        if (error.response) {
          console.log(error.response)
        }
      }
    }
  }
}
</script>
<style>
@import '../assets/stylesheets/login.css';
</style>
