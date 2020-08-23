
<script>
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

D3 Scatter for deign reference: https://codepen.io/Formidablr/pen/VwaaXwM



https://codesandbox.io/s/vue-chartjs-demo-forked-93web?file=/src/components/LineChart.vue 
*/
import { Line, mixins } from "vue-chartjs";
const { reactiveProp } = mixins;

export default {
  name: "LineChart",
  extends: Line,
  mixins: [reactiveProp],
  props: {
    chartData: {}
  },
  mounted() {
    this.renderChart(this.chartData, {
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
            return data.datasets[tooltipItems.datasetIndex].label + ': ' + tooltipItems.yLabel + " units";
          }
        }
      },
      plugins: {}
    });
  }
};
</script>