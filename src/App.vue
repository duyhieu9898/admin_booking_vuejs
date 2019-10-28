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
import { mapActions } from 'vuex';

export default {
  components: {
    headerComponent,
    containerComponent,
    footerComponent,
    chatSideBar
  },
  async created() {
    try {
      this.checkAuthentication()
      await this.setCurrentUser()
      await this.setListUser()
    } catch (error) {
      console.log('rrr', error);
    }
  },
  computed: {
    notAuthScreen() {
      return this.$route.name !== 'login';
    },

  },
  methods: {
    ...mapActions([
      'setListUser',
      'setCurrentUser'
    ]),
    checkAuthentication() {
      return new Promise((resolve, reject) => {
        if(this.$route.query.api_token) {

        }
      })
    }
  }
}
</script>
