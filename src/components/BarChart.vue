<template>
  <svg class="chart"></svg>
</template>


<script>
import * as d3 from 'd3';
import _ from 'lodash';

export default {
  props: {
    figdata: Object,
  },  
  mounted() {
    //Width and height
    var w = 500;
    var h = 100;
    var barPadding = 1;
    
    var a = _.map(this.figdata.price_sold.price_detail, 'unit_price');
    var dataset = a.toString().split(',').map(Number);
    
    //Create SVG element
    var svg = d3.select(".chart")
          .attr("width", w)
          .attr("height", h);

    svg.selectAll("rect")
        .data(dataset)
        .enter()
        .append("rect")
        .attr("x", function(d, i) {
          return i * (w / dataset.length);
        })
        .attr("y", function(d) {
          return h - (d * 4);
        })
        .attr("width", w / dataset.length - barPadding)
        .attr("height", function(d) {
          return d * 4;
        })
        .attr("fill", function(d) {
        return "rgb(0, 0, " + (d * 10) + ")";
        });
  },
}
</script>






