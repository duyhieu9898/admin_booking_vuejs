<template>
  <div class="container">
    <div class="form-group">
      <label for="type-notification">Type Notificaion</label>
      <select class="form-control" id="type-notification" v-model="type_notification">
        <option value="all-users">Sent To All Users</option>
        <option value="some users">Sent To Some Users</option>
      </select>
    </div>
    <search-user v-user v-if="type_notification == 'some users'">Search user</search-user>
    <div class="form-group">
      <label for="title-notification">Title</label>
      <input
        class="form-control"
        id="title-notification"
        type="text"
        v-model="message.title"
        v-validate="'required|min:3|max:36'"
        name="title"
        placeholder="Your Title.."
      />
      <span class="errors">{{ errors.first('title') }}</span>
    </div>
    <div class="form-group">
      <label for="subject">Content</label>
      <textarea
        class="form-control"
        v-model="message.content"
        v-validate="'required|min:3|max:100'"
        name="message"
        placeholder="Write something.."
        style="height:100px"
      ></textarea>
      <span class="errors">{{ errors.first('message') }}</span>
    </div>

    <div class="text-center">
      <input class="btn btn-primary" type="button" value="Submit" @click="sendNotification" />
    </div>
  </div>
</template>

<script>
import searchUser from '@/components/commons/SearchUser'
import apiUrl from '../../constants/apiUrl';

export default {
  name: 'SentNotification',
  components: {
    searchUser
  },
  directives: {
    user: {
      bind: function (el, binding, vnode) {
        console.log(vnode);
      }
    }
  },
  data() {
    return {
      type_notification: "all-users",
      receved_id: null,
      message: {
        title: "",
        content: ""
      },
    };
  },
  methods: {
    async sendNotification() {
      try {
        await this.$validator.validate();
        if (this.errors.any()) {
          alertify.notify("You must fix all errors in the form ", "error", 7);
          return;
        }
        await this.axios.post(apiUrl.SEND_NOTIFICATION, this.message);
        this.message.title='';
        this.message.content='';
        this.$validator.reset();
        //!TODO fix pusher message
      } catch (error) {
        console.log(error);
        console.log(error.response);
      }
    }
  },
  watch: {

  },
};
</script>
<style scoped>
</style>
