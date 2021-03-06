
<template>
  <div id="OverTime" class="tab-content has-text-centered my-6">
    <div
      class="pt-1 tabs is-toggle is-toggle-rounded is-centered has-text-black has-text-weight-medium"
      id="periodTabs"
    >
      <ul class="has-text-weight-medium">
        <li
          class="has-text-black has-text-weight-medium tab"
          v-on:click="activeTab = 'day';  shouldSmooth='false'; showHours=24;"
          v-bind:class="{ 'is-active': activeTab == 'day' }"
        >
          <a>
            <span class="has-text-black has-text-weight-bold">Day</span>
          </a>
        </li>
        <li
          class="has-text-black has-text-weight-medium tab"
          v-on:click="activeTab = 'week'; shouldSmooth='true'; showHours=168;"
          v-bind:class="{ 'is-active': activeTab == 'week' }"
        >
          <a>
            <span class="has-text-black has-text-weight-bold">Week</span>
          </a>
        </li>
        <li
          class="has-text-black has-text-weight-medium tab"
          v-on:click="activeTab = 'month';  shouldSmooth='true'; showHours=672;"
          v-bind:class="{ 'is-active': activeTab == 'month' }"
        >
          <a>
            <span class="has-text-black has-text-weight-bold">Month</span>
          </a>
        </li>
      </ul>
    </div>

    <section class="my-3">
      <label class="is-size-5 mr-1">Apply Smoothing</label>
      <input
        type="checkbox"
        v-model="shouldSmooth"
        true-value="true"
        false-value="false"
        @change="populate()"
      />
    </section>
    <div class="vld-parent" style="margin-right: 1rem">
      <loading :active.sync="isLoading" :is-full-page="false" loader="dots"></loading>
      <LineChart :chartData="chartData" :chartOptions="chartDefaults">
      </LineChart>
    </div>
    <article class="article my-6">
      <div>
        <p class="mb-3">
          <strong>Sensor data for the last {{activeTab}} ({{showHours}}hrs)</strong>
        </p>
        <p>The 2 lines represent particulate matter values (µg per m³) for partcle sizes 2.5µm and 10µm.</p>
        <p>Hover over the line to see more detailed values.</p>
      </div>
      <p class="mt-5">This view will be improved as we continue with the project.</p>
    </article>
    <article class="article my-6">
      <div>
        <p class="mb-3">
          <strong>About smoothing</strong>
        </p>
        <p>
          The
          <a href="https://dawn.cs.stanford.edu//2017/08/07/asap/">type of smoothing used</a> aims to preserve as much of the outlier values as possible and make trends easier to spot.
        </p>
        <p>It does however, use aggregated values, so will loose detail and will not reveal the extent of the outlier values.</p>
        <p>When viewing longer data periods without smoothing, the chart will take longer to load and trends may be harder to pich out of the data.</p>
        <p class="mt-5">We intend to create additional views to better visualise extreme values.</p>
      </div>
    </article>
  </div>
</template>

<script>
import LineChart from "./LineChart";
import { ChartDefaults } from "./LineChart";

import Loading from "vue-loading-overlay";
// import "vue-loading-overlay/dist/vue-loading.css";

import { smooth } from "./asap";
/*
Loading spinner options:
https://github.com/Akryum/vue-progress-path  https://akryum.github.io/vue-progress-path/?ref=madewithvuejs.com
http://greyby.github.io/vue-spinner/?ref=madewithvuejs.com
https://epic-spinners.epicmax.co/?ref=madewithvuejs.com

*/

export default {
  name: "SensorHistory",
  components: {
    LineChart,
    Loading
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
    isLoading: false,
    fullPage: true,
    smooth: smooth,
    activeTab: "day",
    shouldSmooth: "false",
    showHours: 0,
    defaultData: [
      {
        label: "PM2.5",
        backgroundColor: "RGBA(255, 226, 176, 0.6)",
        borderColor: "RGBA(254, 191, 50, 0.0)",
        borderWidth: 0,
        hoverBorderWidth: 5,

        pointHoverBorderColor: "RGBA(254, 191, 50, 0.5)",
        pointBorderColor: "RGBA(254, 191, 50, 0.1)",
        pointBackgroundColor: "RGBA(255, 226, 170, 0.1)",
        pointRadius: 4,
        pointHoverRadius: 6,
        spanGaps: false
      },
      {
        label: "PM10",
        backgroundColor: "RGBA(166, 225, 249, 0.3)",
        borderColor: "RGBA(43, 165, 216, 0)",
        borderWidth: 0,
        hoverBorderWidth: 5,

        pointHoverBorderColor: "RGBA(43, 165, 216, 0.5)",
        pointBorderColor: "RGBA(43, 165, 216, 0.1)",
        pointBackgroundColor: "RGBA(157, 219 ,244, 0.1)",
        pointRadius: 4,
        pointHoverRadius: 6,
        spanGaps: false
      }
    ],
    chartData: {},
    chartDefaults: ChartDefaults
  }),
  watch: {
    device_id: function() {
      this.populate();
    },
    useHourlyMean: function() {
      this.populate();
    },
    showHours: function() {
      this.populate(true);
    }
    // shouldSmooth: function() {
    //   this.populate();
    // }
  },
  created() {
    this.chartData = { datasets: [...this.defaultData] };
    if (this.showHours === 0) this.showHours = this.periodInHours;
    if (this.showHours > 40) this.shouldSmooth = true;
    const midwayDayToWeek = (168 - 24) / 2;
    const midwayWeekToMonth = (672 - 168) / 2;
    if (this.showHours <= 168)
      this.activeTab = this.showHours > midwayDayToWeek ? "week" : "day";
    else this.activeTab = this.showHours > midwayWeekToMonth ? "month" : "week";
  },
  mounted() {
    console.debug(`device id: ${this.device_id}`);
    if (this.periodInHours > 40) this.shouldSmooth = true;
    this.populate();
  },
  methods: {
    populate(clearFirst) {
      this.isLoading = true;
      if (clearFirst)
        this.chartData = { labels: [], datasets: [...this.defaultData] };
      if (this.device_id) {
        this.fetchBoxData(
          this.device_id,
          "PM2.5",
          this.showHours,
          this.useHourlyMean,
          pm2_5data => {
            this.fillDataSet(0, pm2_5data);
            var max = this.getMax(pm2_5data);
            if (max > this.chartDefaults.scales.yAxes[0].ticks.max)
              this.changeAxisMax(max);
          }
        );
        this.fetchBoxData(
          this.device_id,
          "PM10",
          this.showHours,
          this.useHourlyMean,
          pm10data => {
            this.fillDataSet(1, pm10data);
            var max = this.getMax(pm10data);
            if (max > this.chartDefaults.scales.yAxes[0].ticks.max)
              this.changeAxisMax(max);
            this.isLoading = false;
          }
        );
      }
    },
    getMax(data) {
      var max =
        data.reduce(
          (acc, x) => (parseFloat(x.y) > acc ? parseFloat(x.y) : acc),
          0
        ) + 5;
      return Math.round(max / 10) * 10;
    },
    changeAxisMax(newMax) {
      var ticks = {
        stepSize: this.chartDefaults.scales.yAxes[0].ticks.stepSize,
        max: newMax,
        min: this.chartDefaults.scales.yAxes[0].ticks.min,
        beginAtZero: this.chartDefaults.scales.yAxes[0].ticks.beginAtZero
      };
      this.chartDefaults = {
        pointColorAlpha: this.chartDefaults.pointColorAlpha,
        responsive: this.chartDefaults.responsive,
        maintainAspectRatio: this.chartDefaults.maintainAspectRatio,
        title: this.chartDefaults.title,
        tooltips: this.chartDefaults.tooltips,
        plugins: this.chartDefaults.plugins,
        scales: {
          xAxes: this.chartDefaults.scales.xAxes,
          yAxes: [{ ticks }]
        }
      };
    },
    applySmoothing(data) {
      //https://dawn.cs.stanford.edu//2017/08/07/asap/
      //https://github.com/stanford-futuredata/ASAP
      //https://arxiv.org/pdf/1703.00983.pdf
      //
      //alternative: http://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.104.5423&rep=rep1&type=pdf
      //https://github.com/muonsw/ssci
      //https://statsbot.co/blog/time-series-anomaly-detection-algorithms/
      console.debug("applying smoothing");
      var smoothed = smooth(
        data.map(x => parseFloat(x.y)),
        40
      );
      var step = data.length / smoothed.length;

      return smoothed.map((value, index) => {
        var xIndex = Math.floor(index * step);
        if (xIndex >= data.length) xIndex = data.length - 1;
        return { x: data[xIndex]?.x ?? 0, y: value };
      });
    },
    fillDataSet(index, dataset) {
      if (this.shouldSmooth != "false" && this.shouldSmooth)
        dataset = this.applySmoothing([...dataset]);
      var pm2_5 = this.chartData.datasets[0];
      var pm10 = this.chartData.datasets[1];

      if (index === 0) {
        pm2_5.data = dataset;
      }
      if (index === 1) {
        pm10.data = dataset;
      }

      this.chartData = {
        labels: dataset.map(x => x.x),
        datasets: [pm2_5, pm10]
      };
    }
  }
};
</script>

<style>
#periodTabs .tab {
  width: 5rem;
  font-size: 0.8em;
}

.vld-shown {
  overflow: hidden;
}
.vld-overlay {
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  align-items: center;
  display: none;
  justify-content: center;
  overflow: hidden;
  z-index: 9999;
}
.vld-overlay.is-active {
  display: flex;
}
.vld-overlay.is-full-page {
  z-index: 9999;
  position: fixed;
}
.vld-overlay .vld-background {
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  background: #fff;
  opacity: 0.5;
}
.vld-overlay .vld-icon, .vld-parent {
  position: relative;
}

</style>