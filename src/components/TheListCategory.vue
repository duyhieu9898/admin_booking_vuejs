<template>
  <div class="page-content">
    <div class="page-bar">
      <div class="page-title-breadcrumb">
        <div class="pull-left">
          <div class="page-title">category</div>
        </div>
        <ol class="breadcrumb page-breadcrumb pull-right">
          <li>
            <i class="fa fa-home"></i>&nbsp;
            <router-link :to="{ name: 'dash-board'}" class="title">Home</router-link>&nbsp;
            <i class="fa fa-angle-right"></i>
          </li>
          <li class="active">categories</li>
        </ol>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-12">
        <div class="card-box">
          <div class="card-head">
            <header>List Category</header>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-lg-12 category-management">
                <div class="row">
                  <div class="create-category mb-3">
                    <div class="row">
                      <div class="col-md-9">
                        <input
                          v-validate="'required|min:6|max:36'"
                          name="category"
                          type="text"
                          v-model="categoryCreate.name"
                          class="form-control"
                          placeholder="Name..."
                        />
                        <span
                          class="errors"
                        >{{ errors.first('category') }}</span>
                      </div>
                      <div class="col-md-3">
                        <button class="btn btn-primary" @click="createcategory">Create</button>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="list_category table-responsive">
                  <table class="table table-hover">
                    <thead>
                      <tr>
                        <th style="width: 10%;">ID</th>
                        <th style="width: 70%;">Name</th>
                        <th style="width: 20%;">Action</th>
                      </tr>
                    </thead>
                    <tbody v-if="list_categories.length">
                      <tr v-for="(category, index) in list_categories" v-bind:key="category.id">
                        <td>{{ category.id }}</td>
                        <td v-if="!category.isEdit">{{ category.name }}</td>
                        <td v-else>
                          <input
                            v-validate="'required|min:6|max:36'"
                            v-bind:name="'category-' + category.id"
                            type="text"
                            class="form-control"
                            v-model="category.name"
                          />
                          <span
                            v-show="errors.has('category-' + category.id)"
                            class="errors"
                          >{{ errors.first('category-' + category.id) }}</span>
                        </td>
                        <td v-if="!category.isEdit">
                          <button class="btn btn-info" @click="category.isEdit = true">
                            <i class="fa fa-pencil"></i>
                          </button>
                          <button class="btn btn-danger" @click="deletecategory(category,index)">
                            <i class="fa fa-trash-o"></i>
                          </button>
                        </td>
                        <td v-else>
                          <button class="btn btn-primary" @click="updatecategory(category)">Save</button>
                          <button class="btn btn-danger" @click="category.isEdit = false ">Cancel</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
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
  data() {
    return {
      categoryCreate: {
        name: null
      },
      list_categories: []
    };
  },
  created() {
    this.getListcategories();
  },
  methods: {
    getListcategories() {
      this.axios
        .get("/api/categories/")
        .then(response => {
          this.list_categories = response.data;
          this.list_categories.forEach(category => {
            this.$set(category, "isEdit", false);
          });
        })
        .catch(error => {
          console.log(error.response);
        });
    },
    async createcategory() {
      if (this.errors.any()) {
         alertify.notify("You must fix all errors in the form ", "error", 7);
      }
      this.axios
        .post("/api/categories/", this.categoryCreate)
        .then(response => {
          //send notify
          alertify.notify(`CREATE category with id is "${this.categoryCreate.id}"` , "success", 7);
          //can not push category so id category defines the server side, id use for actions, should get all info from database
          this.getListcategories();
          //reset value
          this.categoryCreate = {};
          this.$validator.reset();
        })
        .catch(errors => {
          if (errors.response.data) {
            console.log(errors.response.data);
            this.errors.name = errors.response.data.errors["category.name"][0];
          }
        });


    },
    async updatecategory(category) {
      try {
        if (this.errors.any()) {
          alertify.notify("You must fix all errors in the form ", "error", 7);
          return;
        }
        await this.axios.put("/api/categories/" + category.id, category);
        //send notify
        alertify.notify(`UPDATE category with id is "${category.id}"` , "success", 7);
        category.isEdit = false;
      } catch (error) {
        console.log(error.response);
      }
    },
    deletecategory(category, index) {
        this.isConfirmDelete(category.name).then(res => {
            return this.axios.delete("/api/categories/" + category.id)
        })
        .then(response => {
          this.list_categories.splice(index, 1);
           alertify.notify(`DELETE category with id is "${category.id}"` , "warning", 7);
        })
        .catch(errors => {
          if (errors.response.data.errors) {
            console.log(errors.response.data.errors);
          }
        });
    },
    isConfirmDelete(nameCategory) {
      return new Promise(function(resolve, reject) {
        swal(
          {
            title: "Are you sure?",
            text: 'You will not be able to recover this category and rooms of category!',
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: `Yes, delete "${nameCategory}"!`,
            cancelButtonText: "No, cancel",
            closeOnConfirm: true
          },
          function(isConfirm) {
            if (isConfirm) {
              resolve("delete success");
            } else {
              reject("canelled delete");
            }
          }
        );
      });
    }
  },
};
</script>
<style >
.errors-create-category > p {
  color: red;
}
</style>
