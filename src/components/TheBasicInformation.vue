<template>
  <div class="page-content">
    <div class="page-bar">
      <div class="page-title-breadcrumb">
        <div class="pull-left">
          <div class="page-title">Basic Infomation</div>
        </div>
        <ol class="breadcrumb page-breadcrumb pull-right">
          <li>
            <i class="fa fa-home" />&nbsp;
            <router-link :to="{ name: 'dash-board'}" class="title">Home</router-link>&nbsp;
            <i class="fa fa-angle-right" />
          </li>
          <li class="active">basic-infomation</li>
        </ol>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-12">
        <div class="card-box">
          <div class="card-head">
            <header>Basic Infomation</header>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-lg-12 basic-information-management">
                <div class="list_basic-information table-responsive">
                  <table class="table table-hover">
                    <thead>
                      <tr>
                        <th style="width: 10%;">Constant Name</th>
                        <th style="width: 70%;">Content</th>
                        <th style="width: 20%;" class="text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody v-if="listBasicInformation.length">
                      <tr v-for="(basicInformation) in listBasicInformation" :key="basicInformation.id">
                        <td>{{ basicInformation.name }}</td>
                        <td v-if="!basicInformation.isEdit">{{ basicInformation.content }}</td>
                        <td v-else>
                          <input
                            v-model="basicInformation.content"
                            v-validate="'required|min:4|max:100'"
                            :name="'basicInformation-' + basicInformation.id"
                            type="text"
                            class="form-control"
                          >
                          <span
                            class="errors"
                          >{{ errors.first('basicInformation-' + basicInformation.id) }}</span>
                        </td>
                        <td v-if="!basicInformation.isEdit" class="item-flex-end">
                          <button class="btn btn-info" @click="basicInformation.isEdit = true">
                            <i class="fa fa-pencil" />
                          </button>
                        </td>
                        <td v-else class="item-flex-end">
                          <button class="btn btn-primary" @click="updateBasicInformation(basicInformation)">Save</button>
                          <button class="btn btn-danger" @click="basicInformation.isEdit = false">Cancel</button>
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
/* global alertify */
import apiUrl from '@/constants/apiUrl'

export default {
  name: 'RoomConveniences',
  data () {
    return {
      listBasicInformation: []
    }
  },
  created () {
    this.getListBasicInformation()
  },
  methods: {
    async getListBasicInformation () {
      try {
        const { data } = await this.axios.get(apiUrl.GET_BASIC_INFORMATION)
        this.listBasicInformation = data
        this.listBasicInformation.forEach(basicInformation => {
          this.$set(basicInformation, 'isEdit', false)
        })
      } catch (error) {
        console.log(error.response)
      }
    },
    async updateBasicInformation (basicInformation) {
      try {
        if (this.errors.any()) {
          alertify.notify('You must fix all errors in the form ', 'error', 7)
          return
        }
        await this.axios.put(apiUrl.UPDATE_BASIC_INFORMATION_BY_ID.replace(':id', basicInformation.id), basicInformation)
        // send notify
        alertify.notify(`UPDATE Basic Information with name is "${basicInformation.id}"`, 'success', 7)
        basicInformation.isEdit = false
      } catch (error) {
        console.log(error.response)
        if (typeof error.response.data.errors === 'object') {
          alertify.notify(error.response.data.errors.name[0], 'error', 7)
        }
      }
      this.$validator.reset()
    }
  }
}
</script>
<style lang="css">
  tr > td:first-child {
    font-weight: bold;
  }
  .item-flex-end {
    justify-content: flex-end;
    display: flex;
  }
</style>
