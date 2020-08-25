
<template>
  <div id="OverTime" class="tab-content has-text-centered my-6">
    <LineChart :chartData="chartData" ></LineChart>
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
import { ChartDefaults } from "./LineChart";
// import moment from "moment";

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
  data() {
    return {
      chartData: {
        labels: [
          "00:00",
          "01:00",
          "02:00",
          "03:00",
          "04:00",
          "05:00",
          "06:00",
          "07:00",
          "08:00",
          "09:00",
          "10:00",
          "11:00",
          "12:00",
          "13:00",
          "14:00",
          "15:00",
          "16:00",
          "17:00",
          "18:00",
          "19:00",
          "20:00",
          "21:00",
          "22:00",
          "23:00",
        ],
        datasets: [
          {
            label: "PM2.5",
            backgroundColor: "rgba(0, 0, 0, 0)",
            borderColor: "#F3D374",
            pointBackgroundColor: "#F3D374",
          },
          {
            label: "PM10",
            backgroundColor: "rgba(0, 0, 0, 0)",
            borderColor: "#565F8E",
            pointBackgroundColor: "#565F8E",
          }
        ]
      }     
    }
  },
  watch: {
    device_id: function() { this.populate(); },
    useHourlyMean: function() { this.populate();  },
    periodInHours: function() { this.populate();  }
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
        labels: this.chartData.labels,
        datasets: [
          {
            label: this.chartData.datasets[0].label,
            backgroundColor: this.chartData.datasets[0].backgroundColor,
            borderColor: this.chartData.datasets[0].borderColor,
            pointBackgroundColor: this.chartData.datasets[0].pointBackgroundColor,
            data: this.data[0]
          },
          {
            label: this.chartData.datasets[1].label,
            backgroundColor: this.chartData.datasets[1].backgroundColor,
            borderColor: this.chartData.datasets[1].borderColor,
            pointBackgroundColor: this.chartData.datasets[1].pointBackgroundColor,
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