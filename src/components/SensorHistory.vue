
<template>
  <div id="OverTime" class="tab-content has-text-centered my-6 ml-1">
    <D3LineChart :config="chart_config" :datum="chart_data"></D3LineChart>
    <strong>Real data for the last 24hrs, but hard-coded to a single sensor.</strong>
    <p>This is accessing the Live OpenSenseMap API (needs switching to use a test file for the storybook, but varying the URL).</p>
  </div>
</template>

<script>
import { D3LineChart } from "vue-d3-charts";
import { csv } from "d3-fetch";
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

  TODO:  could to with fixed scale y-axis to give consistent sense of scale
  TODO:  meed to pre-process the data to reduce number of points
*/
export default {
  name: "SensorHistory",
  components: {
    D3LineChart
  },
  data: ()=> ({
      chart_data: [
      ],
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
          visibleSize: 3,
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
  mounted() {
    this.fetchDeviceStats("5ee63c4adc1438001b233b53", "PM2.5", 24, pm2_5data => {
      console.log('pm2_5data');
      console.log(pm2_5data);
              // createdAt: Tue Aug 18 2020 22:10:23 GMT+0100 (British Summer Time)
              // phenomenon: "PM10"
              // value: "0.30"
      var loadingData = pm2_5data.map(x => ({ pm2_5: parseFloat(x.value) , pm10:.0, date: x.createdAt}) );
      this.fetchDeviceStats("5ee63c4adc1438001b233b53", "PM10", 24, pm10data => {
        console.log('pm10data');
        console.log(pm10data);
        pm10data.forEach((x,i) => { if(loadingData[i]) loadingData[i].pm10 = x.value });
        this.chart_data = loadingData;
      });
    });
  },
  methods: {
    fetchDeviceStats(boxid, phenomenon, sampleHours, dataCallback) {
      var toDate = moment();
      var fromDate = moment().subtract(sampleHours, "hours");
      console.log(fromDate.toISOString());
      console.log(toDate.toISOString());
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