
<template>
  <div id="OverTime" class="tab-content has-text-centered my-6 ml-1">
    <D3LineChart :config="chart_config" :datum="chart_data"></D3LineChart>
    <strong>!dummy data!</strong>
  </div>
</template>

<script>
import { D3LineChart } from "vue-d3-charts";
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
*/
export default {
  name: "SensorHistory",
  components: {
    D3LineChart
  },
  data() {
    return {
      chart_data: [
        {pm2_5:  2.10, pm10:  1.84, date: '2020-01-01T00:00'},
        {pm2_5:  2.10, pm10:  1.84, date: '2020-01-01T01:00'},
        {pm2_5:  0.38, pm10:  1.78, date: '2020-01-01T02:00'},
        {pm2_5:  2.38, pm10:  1.34, date: '2020-01-01T03:00'},
        {pm2_5:  2.10, pm10:  1.84, date: '2020-01-01T04:00'},
        {pm2_5:  0.38, pm10:  1.78, date: '2020-01-01T05:00'},
        {pm2_5:  2.38, pm10:  1.34, date: '2020-01-01T06:00'},
        {pm2_5:  9.38, pm10:  4.78, date: '2020-01-01T07:00'},
        {pm2_5:  2.38, pm10:  1.34, date: '2020-01-01T08:00'},
        {pm2_5:  0.38, pm10:  2.07, date: '2020-01-01T09:00'},
        {pm2_5:  2.38, pm10:  1.34, date: '2020-01-01T10:00'},
        {pm2_5:  9.38, pm10:  4.78, date: '2020-01-01T11:00'},
        {pm2_5: 18.32, pm10: 13.92, date: '2020-01-01T12:00'},
        {pm2_5:  0.92, pm10:  2.43, date: '2020-01-01T13:00'},
        {pm2_5:  4.79, pm10:  3.29, date: '2020-01-01T14:00'},
        {pm2_5:  5.76, pm10:  2.33, date: '2020-01-01T15:00'},
        {pm2_5:  5.24, pm10:  3.25, date: '2020-01-01T16:00'},
        {pm2_5:  6.48, pm10:  4.56, date: '2020-01-01T17:00'},
        {pm2_5: 28.47, pm10: 23.46, date: '2020-01-01T18:00'},
        {pm2_5:  2.00, pm10:  4.38, date: '2020-01-01T19:00'},
        {pm2_5:  2.10, pm10:  1.84, date: '2020-01-01T20:00'},
        {pm2_5:  2.10, pm10:  1.84, date: '2020-01-01T21:00'},
        {pm2_5:  0.38, pm10:  1.78, date: '2020-01-01T22:00'},
        {pm2_5:  2.38, pm10:  1.34, date: '2020-01-01T23:00'},
      ],
      chart_config: {
        date: {
          key: "date",
          inputFormat : "%Y-%m-%dT%H:%M",
          outputFormat: "%H:%M"
        },
        values: ['pm2_5', 'pm10'],
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
          scheme: 'schemeCategory10',
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
          labels: ['PM2.5','PM10']
        },
        transition: {
          duration: 350,
          ease: "easeLinear"
        }
      }
    };
  },
  mounted() {},
  methods: {
  }
};
</script>

<style>
</style>