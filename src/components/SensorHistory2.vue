
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
//https://saigesp.github.io/vue-d3-charts/#/linechart
//  - doesn't appear to allow me to vary point colour by value,
//    but might be able to mix standard D3 stuff with what this component wrapps up......

/*
custom D3 (with reactive binding):
  https://medium.com/tyrone-tudehope/composing-d3-visualizations-with-vue-js-c65084ccb686
  https://levelup.gitconnected.com/d3-js-and-vue-js-7a6a721eb79f
  https://www.sitepoint.com/vue-d3-data-visualization-intro/
  https://medium.com/swlh/modular-data-visualizations-with-vue-js-and-d3-87b37392a589

  https://codepen.io/robleroy/details/abdMpoV
  https://codepen.io/Formidablr/pen/VwaaXwM

  TODO: could to with fixed scale y-axis to give consistent sense of scale
  TODO: need to pre-process the data to reduce number of points
          Done, but this hides the outliers...
  TODO: implement caching to reduce API hits & improve UX

  https://docs.opensensemap.org/#api-Measurements
*/
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
    chart_data: [],
    chart_config: {
      date: {
        key: "date",
        inputFormat: "%Y-%m-%dT%H:%M:%S.%LZ",
        outputFormat: "%H:%M"
      },
      values: ["pm2_5", "pm10"],
      axis: {
        yTitle: false,
        xTitle: false,
        yFormat: ".0f",
        xFormat: "%Y-%m-%d %H:%M",
        yTicks: 5,
        xTicks: 3
      },
      color: {
        key: false,
        keys: false,
        scheme: "schemeCategory10",
        current: "#1f77b4",
        default: "#AAA",
        axis: "#000"
      },
      curve: "curveCatmullRom",
      margin: {
        top: 20,
        right: 20,
        bottom: 20,
        left: 40
      },
      points: {
        visibleSize: 0,
        hoverSize: 6
      },
      tooltip: {
        labels: ["PM2.5", "PM10"]
      },
      transition: {
        duration: 350,
        ease: "easeLinear"
      }
    }
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
  methods: {
    fillData() {
      this.chartData = {
        labels: [
          "January" + this.getRandomInt(),
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