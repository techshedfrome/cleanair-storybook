<script>
import { Line } from "vue-chartjs";

export default {
  extends: Line,
  props: {
    chartData: {},
    stepSizeY: 10,
    maxY: 120, 
    chartOptions: null
  },
  methods: {
    populate() {
      this.renderChart(this.chartData, this.chartOptions ?? ChartDefaults);
    }
  },
  watch: {
    chartData: function() {
      this.populate();
    },
    chartOptions: function() {
      this.populate();
    }
  },
  mounted() {
    this.populate();
  }
};

export var ChartDefaults = {
        responsive: true,
        maintainAspectRatio: false,
        title: {
          display: true,
          text: "My Data"
        },
        tooltips: {
          enabled: true,
          callbacks: {
            label: (tooltipItems, data) => {
              return data.datasets[tooltipItems.datasetIndex].label + ': ' + tooltipItems.yLabel + "µg/m³";
            }
          }
        },
        plugins: {},
        scales: {
            yAxes: [{
                ticks: {
                  stepSize: 10,
                  max: 120, 
                  min: 0
                }
            }]
          }
      }
      
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