
<template>
  <div id="OverTime" class="tab-content has-text-centered my-6">
    <LineChart :chartData="chartData"></LineChart>
    <D3LineChart :config="chart_config" :datum="chart_data"></D3LineChart>
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
import { D3LineChart } from "vue-d3-charts";
import LineChart from "./LineChart";
import { csv } from "d3-fetch";
import * as d3 from "d3";
import moment from "moment";
/*
  TODO: could to with fixed scale y-axis to give consistent sense of scale
  TODO: need to pre-process the data to reduce number of points
          Done, but this hides the outliers...
  TODO: implement caching to reduce API hits & improve UX

  https://docs.opensensemap.org/#api-Measurements
*/
export default {
  name: "SensorHistory",
  components: {
    D3LineChart,
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
    },
      chartData: {
        labels: [
          "00:00", "01:00", "02:00", "03:00", "04:00", "05:00", 
          "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", 
          "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", 
          "18:00", "19:00", "20:00", "21:00", "22:00", "23:00",
        ],
        datasets: [
          {
            label: "PM2.5",
            backgroundColor: "rgba(0, 0, 0, 0)",
            borderColor: "#F3D374",
            pointBackgroundColor: "#F3D374",
            data: {}
          },
          {
            label: "PM10",
            backgroundColor: "rgba(0, 0, 0, 0)",
            borderColor: "#565F8E",
            pointBackgroundColor: "#565F8E",
            data: {}
          }
        ]
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
    this.populate();
  },
  methods: {
    populate() {
      if (this.device_id) {
        this.fetchDeviceStats(this.device_id, "PM2.5", this.periodInHours,
          pm2_5data => {
            var data = this.useHourlyMean ? this.formatDateByHourInData(pm2_5data) : pm2_5data;
            console.log('data');

            var loadingData = data.map(x => ({
              date: x.createdAt,
              pm2_5: parseFloat(x.value),
              pm10: 0.0
            }));

            this.fillDataSet(0, this.formatDateByHourInData(pm2_5data).map(x => parseFloat(x.value)));

            this.fetchDeviceStats(this.device_id, "PM10", this.periodInHours,
              pm10data => {
                var data = this.useHourlyMean ? this.formatDateByHourInData(pm10data) : pm10data;
                data.forEach((x, i) => {
                  if (loadingData[i]) loadingData[i].pm10 = parseFloat(x.value);
                });
                this.chart_data = loadingData;
                console.log(this.chart_data);

                this.fillDataSet(1, this.formatDateByHourInData(pm10data).map(x => parseFloat(x.value)));
              }
            );
          }
        );
      }
    },
    fillDataSet(index, data) {
      console.log(this.chartData.datasets[0]);
      console.log(`got chartData ${index}`);
      var pm2_5 = this.chartData.datasets[0];
      var pm10  = this.chartData.datasets[1];
      console.log('got data');
      if(index===0) pm2_5.data = data;
      if(index===1) pm10.data  = data;

      console.log(this.chartData.labels);
      this.chartData = {
          labels: this.chartData.labels,
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