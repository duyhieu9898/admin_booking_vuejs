<template>
  <div class="row">
      <div class="col-lg-12">
      <div class="card-box">
        <div class="card-header">
           <header>Biểu đồ đặt phòng trong tháng</header>
        </div>
        <div class="card-body">
          <apex-chart type="area" :height="500" :options="chartOptions" :series="series"></apex-chart>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import apexChart from 'vue-apexcharts'
import apiUrl from '../../constants/apiUrl.js'

export default {
  name: 'ChartBooking',
  components: {
    apexChart
  },
  data: function() {
    return {
      series: [
        {
          name: "total book",
          data: []
        }
      ],
      chartOptions: {

        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: "smooth"
        },
        xaxis: {
          type: "datetime",
          categories: [
          ]
        },
        tooltip: {
          x: {
            format: "dd/MM/yyyy"
          }
        }
      }
    };
  },
  created() {
    this.getDataStatistical();
  },
  methods: {
    async getDataStatistical() {
      try {
        let response = await this.axios.get(apiUrl.GET_STATISTICAL);
        let datas = response.data.list_book_day;
        let chart_total_book = [];
        let date = new Date();
        //
        let arrCategory = [];
        for (let i = 1; i <= this.daysInMonth(date.getMonth(), date.getFullYear()); i++) {
          arrCategory.push(`${date.getFullYear()}-${date.getMonth() + 1}-${i}`);
        }

        this.chartOptions = {
          ...this.chartOptions,
          ...{
            xaxis: {
              categories: arrCategory
            }
          }
        };
        //
        for (let index = 1; index <= date.getDate(); index++) {
          chart_total_book.push(0);
        }

        datas.forEach(element => {
          chart_total_book[element.day - 1] = element.totalBook;
        });

        this.series[0].data = chart_total_book;
      } catch (error) {
        console.log(error);
      }
    },
    daysInMonth(month, year) {
      return new Date(year, month, 0).getDate();
    }
  }
};
</script>
