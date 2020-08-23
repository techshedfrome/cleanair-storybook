
<template>
  <div id="OverTime" class="tab-content has-text-centered my-6">
    <LineChart :chartData="chartData"></LineChart>
    <article class="article my-6">
      <div>
        <p class="mb-3">
          <strong>Sensor data for the last 24hrs.</strong>
        </p>
        <p>The 2 lines represent particulate matter values (µg per m³) for partcle sizes 2.5µm and 10µm.</p>
        <p>Hover over the line to see more detailed values.</p>
      </div>
      <p class="mt-5">This view will be improved as we continue with the project.</p>
    </article>
  </div>
</template>

<script>
import LineChart from "./LineChart";
import moment from "moment";

export default {
  name: "SensorHistory2",
  components: {
    LineChart
  },
  props: {
    device_id: {
      type: String,
      required: false,
      default: () => ""
    },
    useHourlyMean: {
      type: Boolean,
      required: false,
      default: () => false
    },
    periodInHours: {
      type: Number,
      required: false,
      default: () => 24
    }
  },
  data: () => ({
    chartData: {},
  }),
  watch: {
    device_id: function() {
      this.populate();
    },
    useHourlyMean: function() {
      this.populate();
    },
    periodInHours: function() {
      this.populate();
    }
  },
  mounted() {
    // console.log(`device id: ${this.device_id}`);
    this.fillData();
  },
  methods: {
    fillData() {
      this.chartData = {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December"
        ],
        datasets: [
          {
            label: "Data One",
            backgroundColor: "rgba(11, 71, 188, 0.3)",
            borderColor: "rgba(6, 116, 188, 0.50)",
            pointBackgroundColor: "rgba(171, 71, 188, 1)",
            data: [
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt()
            ]
          },
          {
            label: "Data 2",
            backgroundColor: "rgba(171, 71, 188, 0.3)",
            borderColor: "rgba(6, 116, 188, 0.50)",
            pointBackgroundColor: "rgba(171, 71, 188, 1)",
            data: [
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt()
            ]
          }
        ]
      };
    },
    getRandomInt() {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5;
    }
  }
};
</script>

<style>
</style>