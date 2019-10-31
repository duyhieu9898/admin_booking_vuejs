<template>
  <div class="admin-app">
    <header-component v-if="notAuthScreen"/>
    <container-component v-if="notAuthScreen"/>
    <router-view v-if="!notAuthScreen"/>
    <chat-side-bar v-if="notAuthScreen"/>
    <footer-component v-if="notAuthScreen"/>
  </div>
</template>
<script>
import headerComponent from './components/layout/Header'
import containerComponent from './components/layout/Container.vue'
import footerComponent from './components/layout/Footer.vue'
import chatSideBar from './components/commons/ChatSideBar.vue'
import { mapGetters, mapActions, mapMutations } from 'vuex';

export default {
  components: {
    headerComponent,
    containerComponent,
    footerComponent,
    chatSideBar
  },
  data() {
    return {
      isLogin: false
    }
  },
  created() {
    if (this.notAuthScreen) {
      this.checkAuthentication()
      this.setCurrentUser()
      this.setListUser()
    }
  },
  computed: {
    ...mapGetters([
      'apiToken'
    ]),
    notAuthScreen() {
      return this.$route.name !== 'login';
    },
  },
  methods: {
    ...mapActions([
      'setApiToken',
      'setListUser',
      'setCurrentUser'
    ]),
    ...mapMutations([
      'SET_API_TOKEN'
    ]),
    checkAuthentication() {
      const apiToken = this.$route.query.api_token || localStorage.getItem('api_token')
      if (apiToken) {
        this.setApiToken(apiToken)
      }
      else {
        this.$router.push({ name: 'login'})
      }
    }
  }
}
</script>
