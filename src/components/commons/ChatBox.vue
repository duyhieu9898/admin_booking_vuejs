<template>
  <div class="chat-sidebar-item">
    <div class="chat-sidebar-chat-user" style="height: cacl(100vh - 200px); overflow-y: auto;">
      <div class="page-quick-sidemenu">
        <a href="javascript:;" class="chat-sidebar-back-to-list">
          <i class="fa fa-angle-double-left" />Back
        </a>
      </div>
      <div v-show="loadingMessages">
        <p>Loading messages... Please wait</p>
      </div>
      <div
        class="chat-sidebar-chat-user-messages"
        data-height="311"
        style="height: 311px; overflow-y: auto;"
      >
        <div
          v-for="message in messages" :key="message.id"
          class="post"
          :class="[message.sender_id === currentUser.id ? 'out' : 'in']"
        >
          <img class="avatar" alt="" src="assets/img/dp.jpg">
          <div class="message">
            <span class="arrow" />
            <a href="javascript:;" class="name">{{ message.sender.name }}</a>
            <span class="datetime">{{ message.created_at }}</span>
            <span :class="[message.sender_id === currentUser.id ? 'body-out' : 'body']"> {{ message.message }} </span>
          </div>
        </div>
      </div>
    </div>
    <div class="chat-sidebar-chat-user-form">
      <div class="input-group">
        <input
          v-model="newMessage"
          type="text"
          class="form-control" placeholder="Type a message here..."
          @keyup.enter="sendMessage()"
        >
        <div class="input-group-btn">
          <button type="button" class="btn deepPink-bgcolor" @click="sendMessage()">
            <i class="fa fa-arrow-right" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
/* global $ */

import apiUrl from '../../constants/apiUrl'
import { mapGetters } from 'vuex'

export default {
  name: 'ChatBox',
  props: {
    receiver: {
      required: true,
      type: Object
    },
    pusher: {
      required: true,
      type: Object
    },
    onLoad: {
      required: true,
      type: Boolean
    }
  },
  data: () => {
    return {
      messages: [],
      loadingMessages: false,
      newMessage: ''
    }
  },
  computed: {
    ...mapGetters([
      'currentUser'
    ])
  },
  watch: {
    pusher: function () {
      this.listenerMessage()
    },
    onLoad: function () {
      this.loadMessages()
    }
  },
  mounted () {
    this.listenerMessage()
  },
  methods: {
    listenerMessage () {
      const channel = this.pusher.subscribe('newMessage-' + this.receiver.id + '-' + this.currentUser.id) // newMessage-[chatting-with-who]-[my-id]
      const app = this

      channel.bind('App\\Events\\MessageSent', function (data) {
        app.messages.push(data.message)
        app.scrollChatBottom()
      })
    },

    loadMessages () {
      this.loadingMessages = true
      this.axios.post(apiUrl.GET_MESSAGES, {
        sender_id: this.receiver.id
      }).then((resp) => {
        this.messages = resp.data
        this.loadingMessages = false
        this.scrollChatBottom(true)
      }).catch((error) => {
        console.log(error)
      })
    },

    async sendMessage () {
      try {
        if (this.newMessage !== '') {
          const message = this.newMessage
          this.newMessage = ''

          const { data } = await this.axios.post(apiUrl.SEND_MESSAGE, {
            sender_id: this.currentUser.id,
            receiver_id: this.receiver.id,
            message: message
          })
          this.messages.push(data)
          console.log(data)
          this.scrollChatBottom()
        }
      } catch (error) {
        console.log(error.response)
      }
    },

    scrollChatBottom (firstTime = false) {
      this.$nextTick(() => {
        if (firstTime) {
          const position = $('.chat-sidebar-chat-user-messages > .post:last-child').position()
          if (position) {
            $('.chat-sidebar-chat-user-messages').animate({ scrollTop: position.top }, 1000)
          }
        } else {
          const messages = $('.chat-sidebar-chat-user-messages')[0]
          messages.scrollTop = messages.scrollHeight
        }
      })
    }
  }
}
</script>
