<template>
  <div class="page-content">
    <div class="page-bar">
      <div class="page-title-breadcrumb">
        <div class="pull-left">
          <div class="page-title">All Rooms</div>
        </div>
        <ol class="breadcrumb page-breadcrumb pull-right">
          <li>
            <i class="fa fa-home" />&nbsp;
            <router-link :to="{ name: 'dash-board'}" class="title">
              Home
            </router-link>&nbsp;
            <i class="fa fa-angle-right" />
          </li>
          <li class="active">Rooms</li>
        </ol>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <div class="card card-box">
          <div class="card-head">
            <header>All Rooms</header>
            <div class="tools">
              <a class="fa fa-repeat btn-color box-refresh" href="javascript:;" />
              <a class="t-collapse btn-color fa fa-chevron-down" href="javascript:;" />
              <a class="t-close btn-color fa fa-times" href="javascript:;" />
            </div>
          </div>
          <div class="card-body">
            <div class="row p-b-20">
              <div class="col-md-6 col-sm-6 col-6">
                <div class="btn-group">
                  <router-link id="addRow" :to="{ name: 'room-create' }" class="btn btn-info">
                    Add New
                    <i class="fa fa-plus" />
                  </router-link>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-sm-12">
                <div class="dataTables_scroll">
                  <div
                    class="dataTables_scrollBody"
                    style="position: relative; overflow: auto; width: 100%;"
                  >
                    <table
                      id="table-rooms"
                      class="table table-hover table-checkable order-column full-width dataTable no-footer"
                      role="grid"
                      aria-describedby="example4_info"
                      style="width: 1550px;"
                    >
                      <thead>
                        <tr role="row">
                          <th
                            class="center sorting"
                            aria-controls="example4"
                            aria-label=" # : activate to sort column ascending"
                          >
                            <div class="dataTables_sizing">#</div>
                          </th>
                          <th
                            class="center sorting"
                            aria-controls="example4"
                            aria-label=" Type : activate to sort column ascending"
                          >
                            <div class="dataTables_sizing">Category</div>
                          </th>
                          <th
                            class="center sorting"
                            aria-controls="example4"
                            aria-label=" AC/Non AC : activate to sort column ascending"
                          >
                            <div class="dataTables_sizing">Title</div>
                          </th>
                          <th
                            class="center sorting"
                            aria-controls="example4"
                            aria-label=" Meal : activate to sort column ascending"
                          >
                            <div class="dataTables_sizing">Pleople of Room</div>
                          </th>
                          <th
                            class="center sorting"
                            aria-controls="example4"
                            aria-label=" Phone : activate to sort column ascending"
                          >
                            <div class="dataTables_sizing">Province</div>
                          </th>
                          <th
                            class="center sorting"
                            aria-controls="example4"
                            aria-label=" Rent : activate to sort column ascending"
                          >
                            <div class="dataTables_sizing">Active</div>
                          </th>
                          <th
                            class="center sorting"
                            aria-controls="example4"
                            aria-label=" Action : activate to sort column ascending"
                          >
                            <div class="dataTables_sizing">Action</div>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(room, index) in list_rooms" :key="room.id" class="gradeX">
                          <td class="center">{{ room.id }}</td>
                          <td class="text-primary">{{ room.category.name }}</td>
                          <td>{{ room.title }}</td>
                          <td class="center">{{ room.number_peoples+'/'+room.maximum_peoples_number }}</td>
                          <td class="center">{{ room.address.province.name }}</td>
                          <td class="center">
                            <toggle-button
                              :data-room-id="room.id"
                              :value="room.active == 1"
                              :labels="{checked: 'Show', unchecked: 'Hide'}"
                              :width="60"
                              @change="activeChange"
                            />
                          </td>
                          <td class="center">
                            <router-link
                              :to="{ name: 'room-edit',params: { id: room.id }}"
                              class="btn btn-tbl-edit btn-xs"
                            >
                              <i class="fa fa-pencil" />
                            </router-link>
                            <a
                              href="#"
                              class="btn btn-tbl-delete btn-xs"
                              @click="deleteRoom(room, index)"
                            >
                              <i class="fa fa-trash-o" />
                            </a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-sm-12 col-md-5">
                <div
                  id="example4_info"
                  class="dataTables_info"
                  role="status"
                  aria-live="polite"
                >
                  Showing 1 to 10 of 12 entries
                </div>
              </div>
              <div class="col-sm-12 col-md-7">
                <div id="example4_paginate" class="dataTables_paginate paging_simple_numbers">
                  <ul class="pagination">
                    <li
                      :class="[ pagination.current_page === 1 ? 'disabled' : '']"
                      class="paginate_button page-item previous"
                    >
                      <a class="page-link" @click.prevent="changePage(pagination.current_page - 1)">
                        <span aria-hidden="true">prev</span>
                      </a>
                    </li>
                    <li
                      v-for="page in pagesNumber"
                      :key="page"
                      class="page-item paginate_button"
                      :class="[ page == isActived ? 'active' : '']"
                    >
                      <a class="page-link" @click.prevent="changePage(page)">{{ page }}</a>
                    </li>
                    <li
                      :class="[ pagination.current_page === pagination.last_page ? 'disabled' : '']"
                      class="paginate_button page-item next"
                    >
                      <a
                        class="page-link"
                        aria-label="Next"
                        @click.prevent="changePage(pagination.current_page + 1)"
                      >
                        <span aria-hidden="true">next</span>
                      </a>
                    </li>
                  </ul>
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
/* global swal */
import apiUrl from '@/constants/apiUrl'

export default {
  data () {
    return {
      list_rooms: [],
      pagination: {
        total: 0,
        per_page: 2,
        from: 1,
        to: 0,
        current_page: 1
      },
      offset: 4
    }
  },
  computed: {
    isActived: function () {
      return this.pagination.current_page
    },
    pagesNumber: function () {
      if (!this.pagination.to) {
        return []
      }
      let from = this.pagination.current_page - this.offset
      if (from < 1) {
        from = 1
      }
      let to = from + this.offset * 2
      if (to >= this.pagination.last_page) {
        to = this.pagination.last_page
      }
      const pagesArray = []
      while (from <= to) {
        pagesArray.push(from)
        from++
      }
      return pagesArray
    }
  },
  created () {
    this.getListRoomsByPage(1)
  },
  methods: {
    getListRoomsByPage (numPage = 1) {
      this.axios
        .get(apiUrl.GET_ROOMS_BY_PAGE.replace(':page', numPage))
        .then(response => {
          this.list_rooms = response.data.rooms
          this.pagination = response.data.pagination
        })
        .catch(error => {
          console.error(error.response)
        })
    },
    deleteRoom (room, index) {
      this.isComfirmDeLete()
        .then(res => {
          return this.axios.delete(apiUrl.DELETE_ROOM_BY_ID.replace(':id', room.id))
        })
        .then(response => {
          this.list_rooms.splice(index, 1)
        })
        .catch(errors => {
          if (typeof errors === 'string') {
            console.log(errors)
          } else {
            if (errors.response.data.errors) {
              console.log(errors.response.data.errors)
            }
          }
        })
    },
    changePage: function (page) {
      this.pagination.current_page = page
      this.getListRoomsByPage(page)
    },
    isComfirmDeLete (callback) {
      return new Promise(function (resolve, reject) {
        swal(
          {
            title: 'Are you sure?',
            text: 'You will not be able to recover this room!',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel plx!',
            closeOnConfirm: false
          },
          function (isConfirm) {
            if (isConfirm) {
              swal(
                'Deleted!',
                'This room has been deleted.',
                'success'
              )
              resolve('delete success')
            } else {
              reject('canelled delete')
            }
          }
        )
      })
    },
    activeChange (element) {
      const { value } = element
      const roomId = element.srcEvent.target.parentElement.dataset.roomId
      this.axios
        .post(apiUrl.SET_ROOM_ACTIVE_BY_ID.replace(':id', roomId), { active: value })
        .then(response => {
          console.log(response.data)
        })
        .catch(error => {
          console.error(error.response)
        })
    }
  }
}
</script>
