<script>
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
            console.log(this);
            return tooltipItems.yLabel + "£";
          }
        }
      },
      plugins: {}
    });
  }
};
</script>