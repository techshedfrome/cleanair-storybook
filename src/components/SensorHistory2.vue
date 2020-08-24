
<template>
  <div id="OverTime" class="tab-content has-text-centered my-6">
    <LineChart :chartData="chartData"></LineChart>
    <article class="article my-6">
      <div>
        <p class="mb-3">
          <strong>Currently fake, random data, with incorrect labels</strong>
        </p>
      </div>
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
    console.log(`device id: ${this.device_id}`);
    this.fillData();
  },
  computed: {
    data(){ 
      return [
        [
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
        ],
        [
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
      ]
    }
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
            label: "PM2.5",
            backgroundColor: "rgba(0, 0, 0, 0)",
            borderColor: "#F3D374",
            pointBackgroundColor: "#F3D374",
            data: this.data[0]
          },
          {
            label: "PM10",
            backgroundColor: "rgba(0, 0, 0, 0)",
            borderColor: "#565F8E",
            pointBackgroundColor: "#565F8E",
            data: this.data[1]
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