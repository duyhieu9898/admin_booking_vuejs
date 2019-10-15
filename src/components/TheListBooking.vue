<template>
  <div class="page-content">
    <div class="page-bar">
      <div class="page-title-breadcrumb">
        <div class="pull-left">
          <div class="page-title">Booking</div>
        </div>
        <ol class="breadcrumb page-breadcrumb pull-right">
          <li>
            <i class="fa fa-home"></i>&nbsp;
            <router-link :to="{ name: 'dash-board'}" class="title">Home</router-link>&nbsp;
            <i class="fa fa-angle-right"></i>
          </li>
          <li class="active">Booking</li>
        </ol>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <div class="card-head">
          <header>Booking</header>
        </div>
        <div class="card-body">
          <div class="col-lg-12">
            <div class="card-box">
              <div class="card-header">Booking Infomation</div>
              <div class="card-body">
                <div class="table-scrollable">
                  <div
                    id="booking-table_wrapper"
                    class="dataTables_wrapper container-fluid dt-bootstrap4 no-footer"
                  >
                    <div class="row">
                    <div v-if="list_bookings.length == 0">
                        <p>There are no booking</p>
                    </div>
                      <div
                      v-else
                        class="dataTables_scrollBody"
                        style="position: relative; overflow: auto; width: 100%;"
                      >
                        <table
                          class="table table-hover table-checkable order-column full-width dataTable no-footer"
                          id="booking-table"
                          role="grid"
                          aria-describedby="booking-table_info"
                          style="width: 1550px;"
                        >
                          <thead>
                            <tr role="row">
                              <th class="center sorting">
                                <div class="dataTables_sizing">ID</div>
                              </th>
                              <th class="center sorting">
                                <div class="dataTables_sizing">User ID</div>
                              </th>
                              <th class="center sorting">
                                <div class="dataTables_sizing">User Name</div>
                              </th>
                              <th class="center sorting">
                                <div class="dataTables_sizing">User Phone Number</div>
                              </th>
                              <th class="center sorting">
                                <div class="dataTables_sizing">User email</div>
                              </th>
                              <th class="center sorting">
                                <div class="dataTables_sizing">Date Booking</div>
                              </th>
                              <th class="center sorting">
                                <div class="dataTables_sizing">Status</div>
                              </th>
                              <th class="center sorting">
                                <div class="dataTables_sizing">Action</div>
                              </th>
                            </tr>
                          </thead>

                          <tbody>
                            <tr
                              v-for="(booking, index) in list_bookings"
                              :key="booking.booking_id"
                              class="gradeXlist_bookings even"
                              role="row"
                            >
                              <td class="center">{{ booking.booking_id }}</td>
                              <td class="center">{{ booking.user_id }}</td>
                              <td class="center">{{ booking.user_name }}</td>
                              <td class="center">{{ booking.user_phone }}</td>
                              <td class="center">
                                <a href="mailto:pooja@gmail.com">{{ booking.user_email }}</a>
                              </td>
                              <td class="center">{{ booking.date_booking }}</td>
                              <td class="center">
                                <!-- [ true ? setLableByStatus(status) : ''] -->
                                <span
                                  class="label label-sm"
                                  :class="setLableByStatus(booking.status_booking)"
                                >{{ booking.status_booking }}</span>
                              </td>
                              <td class="center">
                                <router-link
                                  :to="{ name: 'booking',params: { id: booking.booking_id }}"
                                  class="btn btn-info"
                                >
                                  <i class="fa fa-pencil"></i>
                                </router-link>
                                <button
                                  class="btn btn-danger"
                                  @click="deleteBooking(booking.booking_id, index)"
                                >
                                  <i class="fa fa-trash-o"></i>
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
import apiUrl from '@/constants/apiUrl'

export default {
  data() {
    return {
      list_bookings: {}
    };
  },
  created() {
    this.getListBooking();
    let app=this;
    //*realtime user pusher
    // Enable pusher logging - don't include this in production
    Pusher.logToConsole = true;

    var pusher = new Pusher('e9e863659964b9b23e29', {
        cluster: 'ap1',
        encrypted: true
    });

    // Subscribe to the channel we specified in our Laravel Event
    var channel = pusher.subscribe('booking');

    // Bind a function to a Event (the full Laravel class)
    channel.bind('new-booking', function(data) {
      console.log(data);
      app.getListBooking();
    });

    //*realtime user redis and socket
    // this.$socket.on('message', function (data) {
    //   console.log(data);
    //   app.getListBooking();
    // });
  },
  methods: {
    getListBooking() {
      this.axios
        .get(apiUrl.GET_LIST_BOOKING)
        .then(response => {
          this.list_bookings = response.data.booking;
        })
        .catch(error => {
          console.error(error.response);
        });
    },
    deleteBooking(booking_id, index) {
      this.isConfirmDelete(booking_id)
        .then(res => {
          return this.axios.delete(apiUrl.DETELE_BOOKING_BY_ID.replace(':id', booking_id));
        })
        .then(res => {
          this.list_bookings.splice(index, 1);
        })
        .catch(err => {
          console.log(err.response);
        });
    },
    setLableByStatus(status) {
      if (status == "pending") {
        return "label-info";
      } else if (status == "completed") {
        return "label-success";
      } else {
        return "label-warning";
      }
    },
    isConfirmDelete(idBooking) {
      return new Promise(function(resolve, reject) {
        swal(
          {
            title: "Are you sure?",
            text: `You will not be able to recover booking no ${idBooking}!`,
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: `Yes, delete this booking!`,
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
  }
};
</script>
