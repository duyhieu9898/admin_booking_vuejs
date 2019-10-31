<template>
  <div class="page-content">
    <div class="page-bar">
      <div class="page-title-breadcrumb">
        <div class="pull-left">
          <div class="page-title">convenient</div>
        </div>
        <ol class="breadcrumb page-breadcrumb pull-right">
          <li>
            <i class="fa fa-home"></i>&nbsp;
            <router-link :to="{ name: 'dash-board'}" class="title">Home</router-link>&nbsp;
            <i class="fa fa-angle-right"></i>
          </li>
          <li class="active">conveniences</li>
        </ol>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-12">
        <div class="card-box">
          <div class="card-head">
            <header>List Convenient</header>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-lg-12 convenient-management">
                <div class="row">
                  <div class="create-convenient mb-3">
                    <div class="row">
                      <div class="col-md-9">
                        <input
                          v-validate="'required|min:6|max:36'"
                          name="convenient"
                          type="text"
                          v-model="convenientCreate.name"
                          class="form-control"
                          placeholder="Name..."
                        />
                        <span

                          class="errors"
                        >{{ errors.first('convenient') }}</span>
                      </div>
                      <div class="col-md-3">
                        <button class="btn btn-primary" @click="createConvenient">Create</button>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="list_convenient table-responsive">
                  <table class="table table-hover">
                    <thead>
                      <tr>
                        <th style="width: 10%;">ID</th>
                        <th style="width: 70%;">Name</th>
                        <th style="width: 20%;">Action</th>
                      </tr>
                    </thead>
                    <tbody v-if="list_convenient.length">
                      <tr v-for="(convenient, index) in list_convenient" v-bind:key="convenient.id">
                        <td>{{ convenient.id }}</td>
                        <td v-if="!convenient.isEdit">{{ convenient.name }}</td>
                        <td v-else>
                          <input
                            v-validate="'required|min:4|max:36'"
                            v-bind:name="'convenient-' + convenient.id"
                            type="text"
                            class="form-control"
                            v-model="convenient.name"
                          />
                          <span
                            class="errors"
                          >{{ errors.first('convenient-' + convenient.id) }}</span>
                        </td>

                        <td v-if="!convenient.isEdit">
                          <button class="btn btn-info" @click="convenient.isEdit = true">
                            <i class="fa fa-pencil"></i>
                          </button>
                          <button
                            class="btn btn-danger"
                            @click="deleteConvenient(convenient,index)"
                          >
                            <i class="fa fa-trash-o"></i>
                          </button>
                        </td>
                        <td v-else>
                          <button class="btn btn-primary" @click="updateConvenient(convenient)">Save</button>
                          <button class="btn btn-danger" @click="convenient.isEdit = false ">Cancel</button>
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
import apiUrl from '@/constants/apiUrl'

export default {
  name: 'RoomConveniences',
  data() {
    return {
      convenientCreate: {
        name: null
      },
      list_convenient: []
    }
  },
  created() {
    this.getListConvenient()
  },
  methods: {
    async getListConvenient() {
      try {
        const { data } = await this.axios.get(apiUrl.GET_CONVENIENCES)
        this.list_convenient = data
        this.list_convenient.forEach(convenient => {
          this.$set(convenient, "isEdit", false)
        })
      } catch (error) {
        console.log(error.response)
      }
    },
    async createConvenient() {
      try {
        if (this.errors.any()) {
          alertify.notify("You must fix all errors in the form ", "error", 7)
          return
        }
        let responce = await this.axios.post(apiUrl.CREATE_CONVENIENCE, this.convenientCreate)
        //update list convenient side client
        this.convenientCreate.id = responce.data.id
        this.$set(this.convenientCreate, "isEdit", false)
        this.list_convenient.push(this.convenientCreate)
        //send notify
        alertify.notify(`CREATE convenient with id is "${this.convenientCreate.id}"` , "success", 7)
        //reset form value
        this.convenientCreate = {}
        this.$validator.reset()
      } catch (error) {
        console.log(error)
      }
    },
    async updateConvenient(convenient) {
      try {
        if (this.errors.any()) {
          alertify.notify("You must fix all errors in the form ", "error", 7)
          return
        }
        await this.axios.put(apiUrl.UPDATE_CONVENIENCE_BY_ID.replace(':id', convenient.id), convenient)
        //send notify
        alertify.notify(`UPDATE convenient with id is "${convenient.id}"` , "success", 7)
        convenient.isEdit = false
      } catch (error) {
        console.log(error.response)
        if(typeof error.response.data.errors == "object") {
          alertify.notify(error.response.data.errors.name[0] , "error", 7)
        }
      }
      this.$validator.reset()
    },
    async deleteConvenient(convenient, index) {
      try {
        await this.isConfirmDelete(convenient.name)
        await this.axios.delete(apiUrl.DELETE_CONVENIENCE_BY_ID.replace(':id', convenient.id))
        this.list_convenient.splice(index, 1)
        this.$validator.reset()
        alertify.notify(`DELETE convenient with name ${convenient.name}`, "warning", 7)
      } catch (error) {
        if(error.response) {
          console.log(error.response)
        }
        console.log(error)
      }
    },
    isConfirmDelete(nameconvenient) {
      return new Promise(function(resolve, reject) {
        swal(
          {
            title: "Are you sure?",
            text:
              "You will not be able to recover this convenient and conveniences in rooms of !",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: `Yes, delete "${nameconvenient}"!`,
            cancelButtonText: "No, cancel",
            closeOnConfirm: true
          },
          function(isConfirm) {
            if (isConfirm) {
              resolve("delete success")
            } else {
              reject("canelled delete")
            }
          }
        )
      })
    }
  }
}
</script>
<style >
.errors-create-convenient > p {
  color: red;
}
</style>
