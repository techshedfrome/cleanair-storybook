
<template>
  <div id="OverTime" class="tab-content section has-text-centered">Coming Soon: view data over time

        <div id="arc" />

  </div>
</template>

<script>
/*

potential alternative visualisations:
  Area under line - exposure?  (might be hard to read with outliers)
    Show outlier differently?
  number of minutes in each band
  max of contiguous time in each band
  over period, stacked percentage chart of each band

  exploration:
    correlation - pick specific time windows and filter visualisations to that
      enables estimation of personal exposure based on time spent in area

    comparison between sensors in town
      add as multiple series to chart



TODO: Graphing view - likely powered by D3.js

initial example from: https://alligator.io/vuejs/visualization-vue-d3/

https://vuejsexamples.com/tag/echarts/
  https://saigesp.github.io/vue-d3-charts/#/
  https://vuejsexamples.com/a-simple-and-lightweight-vue-component-for-making-charts/

https://vuejsexamples.com/simple-charts-build-with-svg-without-external-deps/

https://vuejsexamples.com/vue-js-component-for-apexcharts/
  https://apexcharts.com/

https://vuejsexamples.com/reactive-vue-js-wrapper-for-google-charts-lib/

https://vuejsexamples.com/a-simple-wrapper-around-frappe-charts-for-vuejs/

https://vuejsexamples.com/built-upon-echarts-component-for-vue-js-2/
  https://ecomfe.github.io/vue-echarts/demo/

https://vuejsexamples.com/create-beautiful-javascript-charts-with-one-line-of-vue/
  https://chartkick.com/vue

https://vuejsexamples.com/a-very-simple-vue-wrapper-for-chart/
https://vuejsexamples.com/easy-and-beautiful-charts-with-chart-js-and-vue-js/

https://vuejsexamples.com/simple-elegant-spark-lines-for-vue-js/
  https://cinwell.com/vue-trend/

https://vuejsexamples.com/a-component-of-chartist-implement-by-vuejs-2-0/

https://vuejsexamples.com/simple-and-elegant-spark-bars-for-vue-js/

https://vuejsexamples.com/echarts-with-vue2-0/
  https://translate.google.co.uk/translate?um=1&ie=UTF-8&hl=en&client=tw-ob&sl=zh-CN&tl=en&u=https%3A%2F%2Fgithub.com%2FSimonZhangITer%2FDataVisualization

*/
import * as d3 from "d3";
export default {
  name: "SensorHistory",
  components: {},
  data() {
    return {
      gdp: [
        { country: "USA", value: 20.5 },
        { country: "China", value: 13.4 },
        { country: "Germany", value: 4.0 },
        { country: "Japan", value: 4.9 },
        { country: "France", value: 2.8 }
      ]
    };
  },
  mounted() {
    this.generateArc();
  },
  methods: {
    generateArc() {
      const w = 500;
      const h = 500;

      const svg = d3
        .select("#arc")
        .append("svg")
        .attr("width", w)
        .attr("height", h);

      const sortedGDP = this.gdp.sort((a, b) => (a.value > b.value ? 1 : -1));
      const color = d3.scaleOrdinal(d3.schemeDark2);

      const max_gdp = d3.max(sortedGDP, o => o.value);

      const angleScale = d3
        .scaleLinear()
        .domain([0, max_gdp])
        .range([0, 1.5 * Math.PI]);

      const arc = d3
        .arc()
        .innerRadius((d, i) => (i + 1) * 25)
        .outerRadius((d, i) => (i + 2) * 25)
        .startAngle(angleScale(0))
        .endAngle(d => angleScale(d.value));

      const g = svg.append("g");

      g.selectAll("path")
        .data(sortedGDP)
        .enter()
        .append("path")
        .attr("d", arc)
        .attr("fill", (d, i) => color(i))
        .attr("stroke", "#FFF")
        .attr("stroke-width", "1px")
        .on("mouseenter", function() {
          d3.select(this)
            .transition()
            .duration(200)
            .attr("opacity", 0.5);
        })
        .on("mouseout", function() {
          d3.select(this)
            .transition()
            .duration(200)
            .attr("opacity", 1);
        });

      g.selectAll("text")
        .data(this.gdp)
        .enter()
        .append("text")
        .text(d => `${d.country} -  ${d.value} Trillion`)
        .attr("x", -150)
        .attr("dy", -8)
        .attr("y", (d, i) => -(i + 1) * 25);

      g.attr("transform", "translate(200,300)");
    }
  }
};
</script>

<style>
</style>