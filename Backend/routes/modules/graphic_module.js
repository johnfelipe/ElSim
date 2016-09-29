const fs = require('fs');
const D3Node = require('d3-node');
const d3 = require('d3');
const topojson = require('topojson');
/**
 * Clase para manejar gráficas en el lado servidor apoyándose en la librería D3.
 * @returns {GraphicObject}
 * @constructor
 */
var GraphicObject = function(){
    this.d3n = this.svg = this.styles = undefined;

    /**
     * Genera una gráfica de tipo barras a partir de un fichero tsv
     */
    this.barChartExample = function(){

        const tsvString = fs.readFileSync('./routes/graphic_examples/barchart.tsv').toString();
        this.styles = '.bar{fill: steelblue;} .bar:hover{fill: brown;} .axis{font: 10px sans-serif;} .axis path,.axis line{fill: none;stroke: #000;shape-rendering: crispEdges;} .x.axis path{display: none;}';
        const markup = '<div id="container"><h2>Bar Chart</h2><div id="chart"></div></div>';
        var options = {selector:'#chart', svgStyles:this.styles, container:markup};
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
            .ticks(10, "");

        this.svg = this.d3n.createSVG()
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var data = d3.tsv.parse(tsvString);

        x.domain(data.map(function (d) {
            return d.partido;
        }));
        y.domain([0, d3.max(data, function (d) {
            return d.total;
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
            .text("Escaños");

        this.svg.selectAll(".bar")
            .data(data)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("x", function (d) {
                return x(d.partido);
            })
            .attr("width", x.rangeBand())
            .attr("y", function (d) {
                return y(d.total);
            })
            .attr("height", function (d) {
                return height - y(d.total);
            });
    };

    /**
     * Genera una gráfica de tipo tarta a partir de un fichero tipo csv
     */
    this.pieChartExample = function(){
        const csvString = fs.readFileSync('./routes/graphic_examples/piechart.csv', 'UTF-8').toString();
        const markup = '<div id="container"><h2>Pie Chart</h2><div id="chart"></div></div>';
        this.styles = '.arc text {font: 10px sans-serif;text-anchor: middle;} .arc path {stroke: #fff;}';
        var options = {selector:'#chart', svgStyles:this.styles, container:markup};

        this.d3n = new D3Node(options);
        var width = 960,
            height = 500,
            radius = Math.min(width, height) / 2;

        var color = d3.scale.ordinal()
            .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

        var arc = d3.svg.arc()
            .outerRadius(radius - 10)
            .innerRadius(0);

        var labelArc = d3.svg.arc()
            .outerRadius(radius - 40)
            .innerRadius(radius - 40);

        var pie = d3.layout.pie()
            .sort(null)
            .value(function (d) {
                return d.population;
            });

        this.svg = this.d3n.createSVG()
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

        var data = d3.csv.parse(csvString);

        var g = this.svg.selectAll(".arc")
            .data(pie(data))
            .enter().append("g")
            .attr("class", "arc");

        g.append("path")
            .attr("d", arc)
            .style("fill", function (d) {
                return color(d.data.age);
            });

        g.append("text")
            .attr("transform", function (d) {
                return "translate(" + labelArc.centroid(d) + ")";
            })
            .attr("dy", ".35em")
            .text(function (d) {
                return d.data.age;
            });
    };

    /**
     * Genera un mapa/gráfica a partir de un fichero tipo JSON
     */
    this.jsonExample = function(){

        const us = require('./../graphic_examples/us-states.json'); // source: https://github.com/bradoyler/atlas-make/tree/master/us-states

        var options = {svgStyles:'.mesh{fill: none;stroke: #333;stroke-width: .5px;stroke-linejoin: round;}'};

        this.d3n = new D3Node(options);

        var width = 960,
            height = 500;
        var projection = d3.geo.albersUsa();
        var path = d3.geo.path()
            .projection(projection);

        this.svg = this.d3n.createSVG()
            .attr("width", width)
            .attr("height", height)
            .append("path")
            .datum(topojson.mesh(us))
            .attr("class", "mesh")
            .attr("d", path);
    };

    return this;
};
module.exports = GraphicObject;
