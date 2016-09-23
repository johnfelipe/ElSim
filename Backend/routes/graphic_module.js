const fs = require('fs');
const tsvString = fs.readFileSync('./routes/barchart.tsv').toString();
const D3Node = require('d3-node');
const d3 = require('d3');

const styles = '.bar{fill: steelblue;} .bar:hover{fill: brown;} .axis{font: 10px sans-serif;} .axis path,.axis line{fill: none;stroke: #000;shape-rendering: crispEdges;} .x.axis path{display: none;}';
const markup = '<div id="container"><h2>Bar Chart</h2><div id="chart"></div></div>';
/**
 * Clase para manejar gráficas en el lado servidor apoyándose en la librería D3.
 * @returns {GraphicObject}
 * @constructor
 */
var GraphicObject = function(){
    var d3n, svg;

    this.initInstance = function(){
        var options = {selector:'#chart', svgStyles:styles, container:markup};
        this.d3n = new D3Node(options);
        var margin = {top: 20, right: 20, bottom: 30, left: 40},
            width = 960 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;

        var x = d3.scale.ordinal()
            .rangeRoundBands([0, width], .1);

        var y = d3.scale.linear()
            .range([height, 0]);

        var xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom");

        var yAxis = d3.svg.axis()
            .scale(y)
            .orient("left")
            .ticks(10, "%");

        this.svg = this.d3n.createSVG()
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var data = d3.tsv.parse(tsvString);

        x.domain(data.map(function (d) {
            return d.letter;
        }));
        y.domain([0, d3.max(data, function (d) {
            return d.frequency;
        })]);

        this.svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

        this.svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text("Frequency");

        this.svg.selectAll(".bar")
            .data(data)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("x", function (d) {
                return x(d.letter);
            })
            .attr("width", x.rangeBand())
            .attr("y", function (d) {
                return y(d.frequency);
            })
            .attr("height", function (d) {
                return height - y(d.frequency);
            });
    };

    return this;
};
module.exports = GraphicObject;
