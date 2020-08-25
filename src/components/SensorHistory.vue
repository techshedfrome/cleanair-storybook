
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
import { csv } from "d3-fetch";
import * as d3 from "d3";
import moment from "moment";
/*
NOTE: still using D3 for csv fetch and rolling up data by hour
  TODO: implement caching to reduce API hits & improve UX

  https://docs.opensensemap.org/#api-Measurements
*/
export default {
  name: "SensorHistory",
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

        this.fetchDeviceStats(this.device_id, "PM2.5", this.periodInHours,
          pm2_5data => {
            var data = (this.useHourlyMean ? this.formatDateByHourInData(pm2_5data) : pm2_5data)
                                                 .reverse()
                                                 .map(x => ({x: x.createdAt, y: parseFloat(x.value).toFixed(2) }) );
            this.fillDataSet(0, data);
            var max = this.getMax(data);
            if(max > this.chartDefaults.scales.yAxes[0].ticks.max) this.changeAxisMax(max);   
          }
        );
        this.fetchDeviceStats(this.device_id, "PM10", this.periodInHours,
          pm10data => {
            var data = (this.useHourlyMean ? this.formatDateByHourInData(pm10data) : pm10data)
                                                 .reverse()
                                                 .map(x => ({x: x.createdAt, y: parseFloat(x.value).toFixed(2) }) );
            this.fillDataSet(1, data);
            var max = this.getMax(data);
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
                  stepSize: this.chartDefaults.scales.xAxes[0].stepSize,
                  max: newMax, 
                  min: this.chartDefaults.scales.xAxes[0].min
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
    },
    formatDateByHourInData(data) {
      return d3
        .nest()
        .key(d =>
          moment(d.createdAt)
            .minute(0)
            .second(0)
            .millisecond(0)
            .toISOString()
        )
        .rollup(
          d => d3.mean(d, g => g.value),
          d => d.date
        )
        .entries(data)
        .sort((a, b) => b.key - a.key)
        .reverse()
        .map(x => ({ createdAt: x.key, value: x.value }));
    },
    fetchDeviceStats(boxid, phenomenon, sampleHours, dataCallback) {
      var toDate = moment();
      var fromDate = moment().subtract(sampleHours, "hours");
      var url = `https://api.opensensemap.org/boxes/data?boxId=${boxid}&from-date=${fromDate.toISOString()}&to-date=${toDate.toISOString()}&phenomenon=${phenomenon}&columns=createdAt,value,phenomenon`;

      console.log("fetching csv");
      console.log(url);
      csv(url)
        .then(dataCallback)
        .catch(request => {
          if (!request.ok) {
            console.error(request.Error);
            throw Error(request.status);
          }
          return request;
        });
    }
  }
};
</script>

<style>
</style>