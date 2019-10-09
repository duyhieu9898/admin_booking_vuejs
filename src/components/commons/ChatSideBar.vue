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
              <div class="tab-pane chat-sidebar-chat animated slideInRight active show" id="quick_sidebar_tab_2">
                  <div class="chat-sidebar-list">
                      <div class="slimScrollDiv" style="position: relative; overflow: hidden; width: auto; height: 784px;"><div class="chat-sidebar-chat-users slimscroll-style" data-rail-color="#ddd" data-wrapper-class="chat-sidebar-list" style="height: 352px; overflow: auto; width: auto;" data-height="311">
                          <div class="chat-header"><h5 class="list-heading">Online</h5></div>
                          <ul class="media-list list-items" >
                              <li
                                v-for="user in users"
                                :key="user.id"
                                @click="openChat(user.id)"
                                class="media"
                                >
                                <div class="media-status">
                                  <span class="badge badge-warning">4</span>
                                </div>
                                <img class="media-object" src="assets/img/user/user3.jpg" alt="..." width="35" height="35">
                                  <i class="online dot"></i>
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
                                  <i class="offline dot"></i>
                                  <div class="media-body">
                                      <h5 class="media-heading">Jennifer Maklen</h5>
                                      <div class="media-heading-sub">Nurse</div>
                                      <div class="media-heading-small">Last seen 01:20 AM</div>
                                  </div>
                              </li>
                          </ul>
                      </div><div class="slimScrollBar" style="background: rgb(158, 165, 171) none repeat scroll 0% 0%; width: 5px; position: absolute; top: 0px; opacity: 0.4; display: none; border-radius: 7px; z-index: 99; right: 1px; height: 171.138px;"></div><div class="slimScrollRail" style="width: 5px; height: 100%; position: absolute; top: 0px; display: none; border-radius: 7px; background: rgb(51, 51, 51) none repeat scroll 0% 0%; opacity: 0.2; z-index: 90; right: 1px;"></div></div>
                  </div>
                  <div class="chat-sidebar-item">


                      <div class="chat-sidebar-chat-user" style="height: cacl(100vh - 200px); overflow-y: auto;">
                          <div class="page-quick-sidemenu">
                              <a href="javascript:;" class="chat-sidebar-back-to-list">
                                  <i class="fa fa-angle-double-left"></i>Back
                              </a>
                          </div>
                          <div v-show="loadingMessages">
                              <p>Loading messages... Please wait</p>
                          </div>
                          <div class="chat-sidebar-chat-user-messages" data-height="311" style="height: 311px; overflow-y: auto;">
                              <div class="post out">
                                  <img class="avatar" alt="" src="assets/img/dp.jpg">
                                  <div class="message">
                                      <span class="arrow"></span> <a href="javascript:;" class="name">Kiran Patel</a> <span class="datetime">9:10</span>
                                      <span class="body-out"> could you send me menu icons ? </span>
                                  </div>
                              </div>
                              <div class="post in">
                                  <img class="avatar" alt="" src="assets/img/user/user5.jpg">
                                  <div class="message">
                                      <span class="arrow"></span> <a href="javascript:;" class="name">Jacob Ryan</a> <span class="datetime">9:10</span>
                                      <span class="body"> please give me 10 minutes. </span>
                                  </div>
                              </div>
                          </div>

                      </div>

                      <div class="chat-sidebar-chat-user-form">
                        <div class="input-group">
                            <input type="text" class="form-control" placeholder="Type a message here...">
                            <div class="input-group-btn">
                                <button type="button" class="btn deepPink-bgcolor">
                                    <i class="fa fa-arrow-right"></i>
                                </button>
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


  export default {
    name: 'ChatApplication',
    data: () => {
      return {
        users: [],
        messages: [],
        chatOpen: false,
        chatUserID: null,
        loadingMessages: false,
        newMessage: ''
      }
    },
    created () {
      let app = this
      app.loadUsers()
    },
    watch: {
      messages: function () {
        let element = this.$refs.messageBox
        element.scrollTop = element.scrollHeight
      }
    },
    methods: {
      openChat (userID) {
        let app = this
        if (app.chatUserID !== userID) {
          app.chatOpen = true
          app.chatUserID = userID

          // Start pusher listener
          Pusher.logToConsole = true

          var pusher = new Pusher('e9e863659964b9b23e29', {
            cluster: 'ap1',
            forceTLS: true
          })

          var channel = pusher.subscribe('newMessage-' + app.chatUserID + '-' + app.$root.userID) // newMessage-[chatting-with-who]-[my-id]

          channel.bind('App\\Events\\MessageSent', function (data) {
            if (app.chatUserID) {
              app.messages.push(data.message)
            }
          })
          // End pusher listener
          app.loadMessages()
        }
      },
      loadUsers () {
        let app = this
        this.axios.get('api/users')
          .then((resp) => {
            app.users = resp.data
          })
      },
      loadMessages () {
        let app = this
        app.loadingMessages = true
        app.messages = []
        this.axios.post('api/messages', {
          sender_id: app.chatUserID
        }).then((resp) => {
          app.messages = resp.data
          app.loadingMessages = false
        })
      },
      sendMessage () {
        let app = this
        if (app.newMessage !== '') {
          this.axios.post('api/messages/send', {
            sender_id: app.$root.userID,
            receiver_id: app.chatUserID,
            message: app.newMessage
          }).then((resp) => {
            app.messages.push(resp.data)
            app.newMessage = ''
          })
        }
      }
    },
    watch: {
      users: function() {
        this.$nextTick(() => {
          App.handleQuickSidebarChat()
        })
      }
    },
  }
</script>
