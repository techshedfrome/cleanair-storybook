<script>
import { Line } from "vue-chartjs";
import { pm25ToIndex, pm10ToIndex } from "./airquality-index.js";

export default {
  extends: Line,
  props: {
    chartData: {},
    chartOptions: null
  },
  methods: {
    populate() {
      // console.log(this.chartData);
      for (var i = 0; i < this.chartData.length; i++) {
        this.chartData[0].points[i].fillColor = this.getPointColor(0, this.ChartData);
        this.chartData[1].points[i].fillColor = this.getPointColor(1, this.ChartData);
      }
      this.renderChart(this.chartData, this.chartOptions);
      //generate color range between based on values
    },
    getPointColor(datasetIndex, value) {
      var alpha = this.chartOptions.pointColorAlpha ?? ChartDefaults.pointColorAlpha; 
      var colors = [
        `rgba( 37, 255,  91, ${alpha})`,
        `rgba(136, 253,  40, ${alpha})`,
        `rgba(166, 226,   2, ${alpha})`,
        `rgba(255, 230,   0, ${alpha})`,
        `rgba(255, 208,   0, ${alpha})`,
        `rgba(255, 187,   0, ${alpha})`,
        `rgba(255, 145,   0, ${alpha})`,
        `rgba(255, 123,   0, ${alpha})`,
        `rgba(253,  73,  28, ${alpha})`,
        `rgba(224,  28, 224, ${alpha})`
      ];
      var translator = [pm25ToIndex, pm10ToIndex];
      return colors[translator[datasetIndex](value) - 1];
    },
  },
  computed: {},
  watch: {
    chartData: function() {
      this.populate();
    },
    options: function() {
      this.populate();
    }
  },
  mounted() {
    let component = this;
    this.addPlugin({
      id: "vary-color",
      beforeDatasetUpdate() {
        function addPointColors(datasetIndex) {
          var pointColors = [];
          for ( var i = 0; i < component.chartData.datasets[datasetIndex].data.length; i++)
            pointColors.push(
              component.getPointColor(0, component.chartData.datasets[datasetIndex].data[i].y)
            );
          component.chartData.datasets[datasetIndex].pointBackgroundColor = pointColors;
        }
        addPointColors(0);
        addPointColors(1);
      }
    });
    this.populate();
  }
};

export var ChartDefaults = {
  pointColorAlpha: 0.4,
  responsive: true,
  maintainAspectRatio: false,
  title: {
    display: false,
    text: "Sensor Data for the Last 24hrs"
  },
  tooltips: {
    enabled: true,
    callbacks: {
      label: (tooltipItems, data) => {
        return ` ${data.datasets[tooltipItems.datasetIndex].label}: ${
          tooltipItems.yLabel
        }µg/m³`;
      }
    }
  },
  scales: {
    xAxes: [
      {
        type: "time",
        time: {
          unit: "hour",
          tooltipFormat: "HH:mm MMM D",
          displayFormats: {
            hour: "HH:mm",
            day: 'D MMMM'
          }
        },
        gridLines: {
          display: false
        },
        ticks: {
          source: 'auto',
          major: 
          {
            enabled: true,
          }
        }
      }
    ],
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
          stepSize: 5,
          max: 10,
          min: 0
        }
      }
    ]
  },
  plugins: [],
  legend: {
    labels: {
      usePointStyle: false
    },
    onHover: function(event, legendItem) {
      var ci = this.chart;
      ci.updateHoverStyle(ci.getDatasetMeta(0).data, null, false);
      ci.updateHoverStyle(ci.getDatasetMeta(1).data, null, false);
      ci.updateHoverStyle(
        ci.getDatasetMeta(legendItem.datasetIndex).data,
        null,
        true
      );
      ci.render();
    },
    onLeave: function() {
      var ci = this.chart;
      ci.updateHoverStyle(ci.getDatasetMeta(0).data, null, false);
      ci.updateHoverStyle(ci.getDatasetMeta(1).data, null, false);
      ci.render();
    }
  }
};


/*
Looked at Konva
https://konvajs.org/docs/sandbox/index.html
https://codesandbox.io/s/github/konvajs/site/tree/master/vue-demos/basic_demo?from-embed=&file=/src/App.vue
https://codesandbox.io/s/naughty-worker-sj0iw?from-embed=&file=/src/App.js
https://medium.com/@louisemoxy/my-canvas-d3-and-react-setup-1a325bd4fde5

Decided on ChartJS
https://vue-chartjs.org/
https://www.chartjs.org/docs/latest/configuration/tooltip.html
https://codepen.io/Formidablr/pen/XWdpgjO?editors=1010
https://www.chartjs.org/samples/latest/
https://codesandbox.io/s/vue-chartjs-demo-forked-93web?file=/src/components/LineChart.vue

D3 Scatter for deign reference: https://codepen.io/Formidablr/pen/VwaaXwM

https://codesandbox.io/s/vue-chartjs-demo-forked-93web?file=/src/components/LineChart.vue 
*/
</script>