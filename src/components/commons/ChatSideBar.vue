<template>
  <div class="chat-sidebar-container" data-close-on-body-click="false">
    <div class="chat-sidebar">
      <ul class="nav nav-tabs">
        <li class="nav-item">
          <a href="#quick_sidebar_tab_2" class="nav-link tab-icon active show" data-toggle="tab"> Chat
          </a>
        </li>
      </ul>
      <div class="tab-content">
        <div id="quick_sidebar_tab_2" class="tab-pane chat-sidebar-chat animated slideInRight active show">
          <div class="chat-sidebar-list">
            <div class="slimScrollDiv" style="position: relative; overflow: hidden; width: auto; height: 784px;">
              <div class="chat-sidebar-chat-users slimscroll-style" data-rail-color="#ddd" data-wrapper-class="chat-sidebar-list" style="height: 352px; overflow: auto; width: auto;" data-height="311">
                <div class="chat-header"><h5 class="list-heading">Online</h5></div>
                <ul class="media-list list-items">
                  <li
                    v-for="user in getListUser"
                    :key="user.id"
                    class="media"
                    @click="openChat(user.id)"
                  >
                    <div class="media-status">
                      <span class="badge badge-warning">4</span>
                    </div>
                    <img class="media-object" src="assets/img/user/user3.jpg" alt="..." width="35" height="35">
                    <i class="online dot" />
                    <div class="media-body">
                      <h5 class="media-heading">{{ user.name }}</h5>
                      <div class="media-heading-sub">message...</div>
                      <div class="media-heading-small">Last seen 01:20 AM</div>
                    </div>
                  </li>
                </ul>
                <div class="chat-header"><h5 class="list-heading">Offline</h5></div>
                <ul class="media-list list-items">
                  <li class="media">
                    <div class="media-status">
                      <span class="badge badge-warning">4</span>
                    </div>
                    <img class="media-object" src="assets/img/user/user6.jpg" alt="..." width="35" height="35">
                    <i class="offline dot" />
                    <div class="media-body">
                      <h5 class="media-heading">Jennifer Maklen</h5>
                      <div class="media-heading-sub">Nurse</div>
                      <div class="media-heading-small">Last seen 01:20 AM</div>
                    </div>
                  </li>
                </ul>
              </div><div class="slimScrollBar" style="background: rgb(158, 165, 171) none repeat scroll 0% 0%; width: 5px; position: absolute; top: 0px; opacity: 0.4; display: none; border-radius: 7px; z-index: 99; right: 1px; height: 171.138px;" /><div class="slimScrollRail" style="width: 5px; height: 100%; position: absolute; top: 0px; display: none; border-radius: 7px; background: rgb(51, 51, 51) none repeat scroll 0% 0%; opacity: 0.2; z-index: 90; right: 1px;" />
            </div>
          </div>
          <template v-for="user in getListUser">
            <chat-box
              v-show="chatUserID === user.id"
              :key="user.id"
              :on-load="chatUserID === user.id"
              :receiver="user"
              :pusher="pusher"
            />
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
/* global App, Pusher */
import ChatBox from './ChatBox'
import { mapGetters } from 'vuex'

export default {
  name: 'ChatSideBar',
  components: {
    ChatBox
  },
  data () {
    return {
      chatUserID: null,
      pusher: null
    }
  },
  computed: {
    ...mapGetters([
      'getListUser',
      'currentUser'
    ])
  },
  watch: {
    getListUser: function () {
      this.$nextTick(() => {
        App.handleQuickSidebarChat()
      })
    }
  },
  created () {
    this.initPushser()
  },
  methods: {
    initPushser () {
      Pusher.logToConsole = true
      const pusher = new Pusher('e9e863659964b9b23e29', {
        cluster: 'ap1',
        forceTLS: true
      })
      this.pusher = pusher
    },
    openChat (userID) {
      this.chatUserID = userID
    }
  }
}
</script>
<style lang="">
  .name {
    color:#b5e1e5 !important
  }
</style>
