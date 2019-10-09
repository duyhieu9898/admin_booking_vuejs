<template>
  <div class="form-group">
    <label for=""><slot></slot></label>
      <vue-tags-input
        v-model="value_search"
        :tags="usersName"
        :add-only-from-autocomplete="true"
        :autocomplete-items="filteredItems"
        @tags-changed="newUsersName => usersName = newUsersName"
      />
      <datalist id="list_users">
        <option v-for="result in list_result_search" :key="result.id" :value="result.name" />
      </datalist>
  </div>
</template>
<script>
import VueTagsInput from '@johmun/vue-tags-input';

export default {

  components: {
    VueTagsInput,
  },
  data() {
    return {
      value_search: '',
      list_result_search: [],
      usersName: [],
    }
  },
  methods: {
    async findUserByNameOrId() {
      try {
        console.log(this.value_search);

        let response = await this.axios.get('api/search-users/'+ this.value_search);
        if(response.data) {
          this.list_result_search = response.data;
          console.log(response);
        }


      } catch (error) {
        console.log(error);
      }
    },
  },
  watch: {
    value_search:function() {
      if(this.value_search !== '') {
        this.findUserByNameOrId();
      }

    }
  },
  computed: {
    filteredItems() {
      let users = this.list_result_search.map((user) => {
        return {text: user.name};
      });
      if(users) {
        console.log(users);
        return users;
      }


      return [];
    }
  },
}
</script>
