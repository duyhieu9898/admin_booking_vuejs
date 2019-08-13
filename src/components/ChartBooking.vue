<template>
<div class="row">
    <div class="container">
        <apexchart  type="area" :height="500" :options="chartOptions" :series="series"></apexchart>
    </div>
</div>
</template>
<script>
export default {
    data: function() {
    return {
      series: [{
          name: 'total book',
          data: [10,2,3,4,15,9]
        }],
        chartOptions: {
          dataLabels: {
            enabled: false
          },
          stroke: {
            curve: 'smooth'
          },
          xaxis: {
            type: 'datetime',
            categories: [
              "2018-09-1",
              "2018-09-2",
              "2018-09-3",
              "2018-09-4",
              "2018-09-5",
              "2018-09-6",
              "2018-09-7",
              "2018-09-8",
              "2018-09-9",
              "2018-09-10",
              "2018-09-11",
              "2018-09-12",
              "2018-09-13",
              "2018-09-14",
              "2018-09-15",
              "2018-09-16",
              "2018-09-17",
              "2018-09-18",
              "2018-09-19",
              "2018-09-20",
              "2018-09-21",
              "2018-09-22",
              "2018-09-23",
              "2018-09-24",
              "2018-09-25",
              "2018-09-26",
              "2018-09-27",
              "2018-09-28",
              "2018-09-29",
            ],
          },
          tooltip: {
            x: {
              format: 'dd/MM/yy'
            },

          }
        }
    }
  },
  created() {
    this.getDataStatistical();
  },
  methods: {
    async getDataStatistical() {
      try {
        let response =  await this.axios.get('api/statistical');
        let datas = response.data.list_book_day;
        let chart_total_book = [];
        var d = new Date();

        for (let index = 1; index <= d.getDate(); index++) {
          chart_total_book.push(0);
        }

        datas.forEach(element => {
           chart_total_book[element.day-1] = element.totalBook;
        });
        console.log(chart_total_book);

        this.series[0].data = chart_total_book;

      } catch (error) {
        console.log(error);
      }
    }
  }
}

</script>





