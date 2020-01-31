<template>
  <div class="page-content">
    <div class="page-bar">
      <div class="page-title-breadcrumb">
        <div class="pull-left">
          <div class="page-title">User Booking</div>
        </div>
        <ol class="breadcrumb page-breadcrumb pull-right">
          <li>
            <i class="fa fa-home" />&nbsp;
            <a class="parent-item" href="index.html">Home</a>&nbsp;
            <i class="fa fa-angle-right" />
          </li>
          <li class="active">Booking</li>
        </ol>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <div class="card-head">
          <header>User Booking</header>
        </div>
        <div class="card-body">
          <div class="col-lg-12">
            <div class="card-box">
              <div class="card-header">User Booking</div>
              <div class="card-body">
                <div class="table-scrollable">
                  <div
                    id="booking-table_wrapper"
                    class="dataTables_wrapper container-fluid dt-bootstrap4 no-footer"
                  >
                    <div class="row">
                      <div
                        class="dataTables_scrollBody"
                        style="position: relative; overflow: auto; width: 100%;"
                      >
                        <table
                          id="booking-table"
                          class="table table-hover table-checkable order-column full-width dataTable no-footer"
                          role="grid"
                          aria-describedby="booking-table_info"
                          style="width: 1550px;"
                        >
                          <thead>
                            <tr role="row">
                              <th
                                class="center sorting"
                                aria-controls="booking-table"
                                aria-label=" # : activate to sort column ascending"
                              >
                                <div class="dataTables_sizing">User ID</div>
                              </th>
                              <th
                                class="center sorting"
                                aria-controls="booking-table"
                                aria-label=" Type : activate to sort column ascending"
                              >
                                <div class="dataTables_sizing">Name</div>
                              </th>
                              <th
                                class="center sorting"
                                aria-controls="booking-table"
                                aria-label=" AC/Non AC : activate to sort column ascending"
                              >
                                <div class="dataTables_sizing">Phone</div>
                              </th>
                              <th
                                class="center sorting"
                                aria-controls="booking-table"
                                aria-label=" Meal : activate to sort column ascending"
                              >
                                <div class="dataTables_sizing">Mail</div>
                              </th>
                              <th
                                class="center sorting"
                                aria-controls="booking-table"
                                aria-label=" Bad Capacity : activate to sort column ascending"
                              >
                                <div class="dataTables_sizing">Booking date</div>
                              </th>
                              <th
                                class="center sorting"
                                aria-controls="booking-table"
                                aria-label=" Type : activate to sort column ascending"
                              >
                                <div class="dataTables_sizing">Action</div>
                              </th>
                            </tr>
                          </thead>

                          <tbody>
                            <tr
                              v-for="userBooking in listUserBookings"
                              :key="userBooking.id"
                              class="gradeX even"
                              role="row"
                            >
                              <td class="user-circle-img sorting_1">{{ userBooking.id }}</td>
                              <td class="center">{{ userBooking.name }}</td>
                              <td class="center">{{ userBooking.phone }}</td>
                              <td class="center">
                                <a :href="'mailto:'+userBooking.email">{{ userBooking.email }}</a>
                              </td>
                              <td class="center">{{ userBooking.updated_at }}</td>
                              <td class="center">
                                <router-link
                                  :to="{ name: 'userBooking-edit',params: { id: userBooking.user_id }}"
                                  class="btn btn-primary"
                                >
                                  <i class="fa fa-pencil" />
                                </router-link>
                                <button class="btn btn-danger">
                                  <i class="fa fa-trash-o" />
                                </button>
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
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // check
  data () {
    return {
      listUserBookings: {}
    }
  },
  created () {
    this.getListUserBooking()
  },
  methods: {
    async getListUserBooking () {
      try {
        const response = await this.axios.get('api/users/bookings')
        this.listUserBookings = response.data.userBooking
      } catch (error) {
        console.error(error.response)
      }
    }
  }
}
</script>
