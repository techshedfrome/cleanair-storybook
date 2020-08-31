<script>
import { Line } from "vue-chartjs";
import { pm25ToIndex, pm10ToIndex } from "./airquality-index.js";

export default {
  extends: Line,
  props: {
    chartData: {},
    chartOptions: null,
  },
  methods: {
    populate() {
      // console.log(this.chartData);
      for(var i = 0; i < this.chartData.length; i++){
        this.chartData[0].points[i].fillColor = getPointColor(0, this.ChartData); 
        this.chartData[1].points[i].fillColor = getPointColor(1, this.ChartData); 
      }
      this.renderChart(this.chartData, this.chartOptions ?? ChartDefaults);
      //generate color range between based on values
    },
    getPointColor(datasetIndex, value){
      var colors = [
            'rgb( 37, 255,  91)',
            'rgb(136, 253,  40)',
            'rgb(166, 226,   2)',
            'rgb(255, 230,   0)',
            'rgb(255, 208,   0)',
            'rgb(255, 187,   0)',
            'rgb(255, 145,   0)',
            'rgb(255, 123,   0)',
            'rgb(253,  73,  28)',
            'rgb(224,  28, 224)',
      ]
      var translator = [
          pm25ToIndex,
          pm10ToIndex
      ]
      return colors[translator[datasetIndex](value)];
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
          display: false,
          text: "Sensor Data for the Last 24hrs"
        },
        tooltips: {
          enabled: true,
          callbacks: {
            label: (tooltipItems, data) => {
              return ` ${data.datasets[tooltipItems.datasetIndex].label}: ${tooltipItems.yLabel}µg/m³`;
            }
          }
        },
        scales: {
            xAxes: [{
                type: 'time',
                time: {
                  unit: 'hour',
                  tooltipFormat: 'MMM D HH:mm',
                  displayFormats: {
                      hour: 'HH:mm'
                  }
                },
                gridLines: {
                    display:false
                }
            }],
            yAxes: [{
                ticks: {
                  beginAtZero: true,
                  stepSize: 10,
                  max: 30, 
                  min: 0
                }
            }]
          },
        plugins: 
        [{
          id: 'vary-color',
          afterDatasetDraw(chart) {
            console.log(chart);
            console.log(chart.chart);
            console.log(chart.chart.ctx);
            console.log(chart.chartData);
            for(var i = 0; i < this.chartData.length; i++){
              this.chartData[0].points[i].fillColor = getPointColor(0, this.ChartData); 
              this.chartData[1].points[i].fillColor = getPointColor(1, this.ChartData); 
            }
            // console.log(chart)
            // const width = chart.chart.width;
            // const height = chart.chart.height;
            // const ctx = chart.chart.ctx;
            // ctx.restore();
            // const fontSize = (height / 114).toFixed(2);
            // ctx.font = `${fontSize}em sans-serif`;
            // ctx.textBaseline = 'middle';
            // const text = '4511kWh';
            // const textX = Math.round((width - ctx.measureText(text).width) / 2);
            // const textY = height / 2;
            // ctx.fillText(text, textX, textY);
            // ctx.save();
          },
        }]
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