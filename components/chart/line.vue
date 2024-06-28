<template>
  <client-only>
    <ApexChart
      type="area"
      height="250"
      :options="chartOptions"
      :series="[series]"
    ></ApexChart>
  </client-only>
</template>

<script>
  export default {
    components: {
      [process.browser && "ApexChart"]: () => import("vue-apexcharts"),
    },
    props: {
      chartData: {
        type: Array,
        default: () => [],
      },
      chartId: {
        type: String,
        default: "line-chart",
      },
      datasetIdKey: {
        type: String,
        default: "label",
      },
      width: {
        type: Number,
        default: 400,
      },
      height: {
        type: Number,
        default: 250,
      },
      cssClasses: {
        default: "",
        type: String,
      },
      styles: {
        type: Object,
        default: () => {},
      },
      plugins: {
        type: Object,
        default: () => {},
      },
    },
    watch: {
      chartData() {
        this.chartOptions = {
          ...this.chartOptions,
          xaxis: {
            ...this.chartOptions.xaxis,
            categories: this.chartData.map((val) => val.date),
          },
        };

        this.series = {
          name: "",
          data: this.chartData.map((val) => val.count),
        };

        console.log(this.chartOptions, this.series);
      },
    },
    data: function () {
      return {
        chartOptions: {
          chart: {
            id: "vue-chart-example",
            zoom: {
              enabled: false,
            },
            toolbar: {
              show: false, // Disable the toolbar (hamburger menu)
            },
          },
          xaxis: {
            labels: {
              rotate: 45,
              hideOverlappingLabels: true,
            },
            categories: [],
          },
          dataLabels: {
            enabled: false,
          },
        },
        series: {
          name: "",
          data: [],
        },
      };
    },
  };
</script>
