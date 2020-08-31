
<template>
  <div id="OverTime" class="tab-content has-text-centered my-6">
    <div style="margin-right: 1rem">
      <LineChart :chartData="chartData" :chartOptions="chartDefaults"></LineChart>
    </div>
    <article class="article my-6">
      <div>
        <p class="mb-3"><strong>Sensor data for the last 24hrs.</strong></p>
        <p>The 2 lines represent particulate matter values (µg per m³) for partcle sizes 2.5µm and 10µm.</p>
        <p>Hover over the line to see more detailed values.</p>
      </div>
      <p class="mt-5">This view will be improved as we continue with the project.</p>
    </article>
  </div>
</template>

<script>
import LineChart from "./LineChart";
import { ChartDefaults } from "./LineChart";

export default {
  name: "SensorHistory",
  components: {
    LineChart
  },
  props: {
    fetchBoxData: {
      type: Function,
      required: false,
      default: () => console.log("fetchBoxData not defined")
    },
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
      chartData: {
        datasets: [
          {
            label: "PM2.5",
            backgroundColor: "RGBA(254, 191, 50, 0.2)",
            borderColor: "RGBA(254, 191, 50, 1.00)",
            pointBackgroundColor: "RGBA(254, 191, 50, 1.00)",
          },
          {
            label: "PM10",
            backgroundColor: "RGBA(43, 165, 216, 0.2)",
            borderColor: "RGBA(43, 165, 216, 1.00)",
            pointBackgroundColor: "RGBA(43, 165, 216, 1.00)",
          }
        ]
      } ,
      chartDefaults: ChartDefaults
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
    this.populate();
  },
  methods: {
    populate() {
      if (this.device_id) {
        this.fetchBoxData(this.device_id, "PM2.5", this.periodInHours, this.useHourlyMean,
          pm2_5data => {
            this.fillDataSet(0, pm2_5data);
            var max = this.getMax(pm2_5data);
            if(max > this.chartDefaults.scales.yAxes[0].ticks.max) this.changeAxisMax(max);   
          }
        );
        this.fetchBoxData(this.device_id, "PM10", this.periodInHours, this.useHourlyMean,
          pm10data => {
            this.fillDataSet(1, pm10data);
            var max = this.getMax(pm10data);
            if(max > this.chartDefaults.scales.yAxes[0].ticks.max) this.changeAxisMax(max);
          }
        );
      }
    },
    getMax(data){
      var max = data.reduce((acc, x) => parseFloat(x.y) > acc ? parseFloat(x.y) : acc, 0) + 10;
      return Math.round(max / 10) * 10;
    },
    changeAxisMax(newMax){
      var ticks = {
                  stepSize: this.chartDefaults.scales.yAxes[0].ticks.stepSize,
                  max: newMax, 
                  min: this.chartDefaults.scales.yAxes[0].ticks.min,
                  beginAtZero: this.chartDefaults.scales.yAxes[0].ticks.beginAtZero,
                };
      this.chartDefaults = 
      {
        responsive: this.chartDefaults.responsive,
        maintainAspectRatio: this.chartDefaults.maintainAspectRatio,
        title: this.chartDefaults.title,
        tooltips: this.chartDefaults.tooltips,
        plugins: this.chartDefaults.plugins,
        scales: {
            xAxes: this.chartDefaults.scales.xAxes,
            yAxes: [{ ticks }]
          }
      }
    },
    fillDataSet(index, data) {
      var pm2_5 = this.chartData.datasets[0];
      var pm10  = this.chartData.datasets[1];
      
      if(index===0) pm2_5.data = data;
      if(index===1) pm10.data  = data;

      this.chartData = {
        labels: data.map(x => x.x),
          datasets: [pm2_5, pm10]
      }
    }
  }
};
</script>

<style>
</style>