<template>
  <div class="state-overview">
    <div class="row">
      <div class="col-xl-3 col-md-6 col-12">
        <div class="info-box bg-blue">
          <span class="info-box-icon push-bottom">
            <i class="material-icons">style</i>
          </span>
          <div class="info-box-content">
            <span class="info-box-text">Room</span>
            <span class="info-box-number">{{ datas.total_room }}</span>
            <div class="progress">
              <div class="progress-bar width-60"></div>
            </div>
            <span class="progress-description">Number Of Room</span>
          </div>
          <!-- /.info-box-content -->
        </div>
        <!-- /.info-box -->
      </div>
      <!-- /.col -->
      <div class="col-xl-3 col-md-6 col-12">
        <div class="info-box bg-orange">
          <span class="info-box-icon push-bottom">
            <i class="material-icons">card_travel</i>
          </span>
          <div class="info-box-content">
            <span class="info-box-text">New Booking</span>
            <span class="info-box-number">{{ datas.total_booking }}</span>
            <div class="progress">
              <div class="progress-bar width-40"></div>
            </div>
            <span class="progress-description">Number of Booking In Month</span>
          </div>
          <!-- /.info-box-content -->
        </div>
        <!-- /.info-box -->
      </div>
      <!-- /.col -->
      <div class="col-xl-3 col-md-6 col-12">
        <div class="info-box bg-purple">
          <span class="info-box-icon push-bottom">
            <i class="material-icons">phone_in_talk</i>
          </span>
          <div class="info-box-content">
            <span class="info-box-text">User</span>
            <span class="info-box-number">{{ datas.total_user }}</span>
            <div class="progress">
              <div class="progress-bar width-80"></div>
            </div>
            <span class="progress-description">Number Of People</span>
          </div>
          <!-- /.info-box-content -->
        </div>
        <!-- /.info-box -->
      </div>
      <!-- /.col -->
      <div class="col-xl-3 col-md-6 col-12">
        <div class="info-box bg-success">
          <span class="info-box-icon push-bottom">
            <i class="material-icons">monetization_on</i>
          </span>
          <div class="info-box-content">
            <span class="info-box-text">Total Earning</span>
            <span class="info-box-number">{{ datas.total_earning_month }}</span>
            <span>VND</span>
            <div class="progress">
              <div class="progress-bar width-60"></div>
            </div>
            <span class="progress-description">Total Earing In Month</span>
          </div>
          <!-- /.info-box-content -->
        </div>
        <!-- /.info-box -->
      </div>
      <!-- /.col -->
    </div>
  </div>
</template>
<script>
export default {
  data: function() {
    return {
      datas:{


      }
    }
  },
  created() {
    this.getDataStatistical();
  },
  methods: {
    async getDataStatistical() {
      try {
        let response = await this.axios.get("api/statistical");
        this.datas = response.data;

      } catch (error) {
        console.log(error);
      }
    },
  }
};
</script>
