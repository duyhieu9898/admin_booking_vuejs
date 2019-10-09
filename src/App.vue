<template>
  <div class="admin-app">
    <header-component v-if="notAuthScreen"/>
    <container-component v-if="notAuthScreen"/>
    <router-view v-if="!notAuthScreen"/>
    <chat-component v-if="notAuthScreen"/>
    <footer-component v-if="notAuthScreen"/>
  </div>
</template>
<script>
export default {
  data() {
    return {
      
    }
  },
  computed: {
    notAuthScreen() {
      return this.$route.name !== 'login';
    }
  },
}
</script>