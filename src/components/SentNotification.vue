<template>
  <div class="container">
    <div class="form-group">
      <label for="fname">Title</label>
      <input
        class="form-control"
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
export default {
  data() {
    return {
      message: {
        title: "",
        content: ""
      }
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
        await this.axios.post("api/sent-notification", this.message);
        this.title='';
        this.content='';
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>
<style scoped>
</style>
