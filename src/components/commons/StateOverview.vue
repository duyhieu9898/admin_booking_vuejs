<template>
  <div class="state-overview">
    <div class="row">
      <div class="col-xl-3 col-md-6 col-12">
        <div class="info-box bg-blue">
          <span class="info-box-icon push-bottom">
            <i class="material-icons">style</i>
          </span>
          <div class="info-box-content">
            <span class="info-box-text">Phòng</span>
            <span class="info-box-number">{{ datas.total_room }}</span>
            <div class="progress">
              <div class="progress-bar width-60" />
            </div>
            <span class="progress-description">Số phòng trong khách sạn</span>
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
            <span class="info-box-text">Đặt phòng</span>
            <span class="info-box-number">{{ datas.total_booking }}</span>
            <div class="progress">
              <div class="progress-bar width-40" />
            </div>
            <span class="progress-description">Sô đơn đặt phòng trong tháng</span>
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
            <span class="info-box-text">Người dùng</span>
            <span class="info-box-number">{{ datas.total_user }}</span>
            <div class="progress">
              <div class="progress-bar width-80" />
            </div>
            <span class="progress-description">Số người dùng</span>
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
            <span class="info-box-text">Thu nhập</span>
            <span class="info-box-number">{{ datas.total_earning_month }}</span>
            <span>VND</span>
            <div class="progress">
              <div class="progress-bar width-60" />
            </div>
            <span class="progress-description">Tổng thu nhập trong tháng</span>
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
import apiUrl from '../../constants/apiUrl.js'

export default {
  name: 'StateOverview',
  data: function () {
    return {
      datas: {}
    }
  },
  created () {
    this.getDataStatistical()
  },
  methods: {
    async getDataStatistical () {
      try {
        const { data } = await this.axios.get(apiUrl.GET_STATISTICAL)
        this.datas = data
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>
