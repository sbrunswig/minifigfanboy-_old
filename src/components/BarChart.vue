<template>
  <svg class="chart" style="padding: 12px 21px;"></svg>
</template>


<script>
import * as d3 from 'd3';
import _ from 'lodash';

export default {
  props: {
    figdata: Object,
  },  
  created() {
    console.log('created');
  },
  mounted() {
    this.drawChart();
  },
  watch: {
    figdata() {
      console.log('fig change');
      this.drawChart();
    }
  },
  methods: {
    drawChart() {
      var a = _.map(this.figdata.price_sold.price_detail, 'unit_price');
      var data = a.toString().split(',').map(Number);
      var barPadding = 1;
      
      // set the dimensions and margins of the graph
      var margin = {top: 20, right: 20, bottom: 30, left: 40},
          width = 250 - margin.left - margin.right,
          height = 200 - margin.top - margin.bottom;

      // set the ranges
      var x = d3.scaleBand()
                .range([0, width])
                .padding(0.1);
      var y = d3.scaleLinear()
                .range([height, 0]);
                
      // append the svg object to the body of the page
      // append a 'group' element to 'svg'
      // moves the 'group' element to the top left margin
      d3.selectAll("svg > *").remove();
      var svg = d3.select(".chart")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
        .append("g")
          .attr("transform", 
                "translate(" + margin.left + "," + margin.top + ")");

      // Scale the range of the data in the domains
        x.domain([0, data.length]);
        y.domain([0, d3.max(data, function(d) { return d; })]);

        // append the rectangles for the bar chart
        svg.selectAll(".bar")
            .data(data)
          .enter().append("rect")
            .attr("class", "bar")
          .attr("x", function(d, i) {
            return i * (width / data.length);
          })
          .attr("width", width / data.length - barPadding)
            .attr("y", function(d) { return y(d); })
            .attr("height", function(d) { return height - y(d); });

        // add the x Axis
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));

        // add the y Axis
        svg.append("g")
            .call(d3.axisLeft(y));
		},





    drawOldChart() {
      //Width and height
      var w = 232;
      var h = 125;
      var barPadding = 1;
      
      var a = _.map(this.figdata.price_sold.price_detail, 'unit_price');
      var dataset = a.toString().split(',').map(Number);
      
      //Create SVG element
      d3.selectAll("svg > *").remove();
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
            return h - (d * 2);
          })
          .attr("width", w / dataset.length - barPadding)
          .attr("height", function(d) {
            return d * 2;
          })
          .attr("fill", function(d) {
            return "rgb(87,162,117)";
            //return "rgb(0, 0, " + (d * 10) + ")";
          });   
    } 
  }
}
</script>






