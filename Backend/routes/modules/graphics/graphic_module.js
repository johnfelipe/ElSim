'use strict';
const fs = require('fs');
const D3Node = require('d3-node');
const d3 = require('d3');
const topojson = require('topojson');
/**
 * Clase para manejar gráficas en el lado servidor apoyándose en la librería D3.
 * @returns {GraphicObject}
 * @constructor
 */
class GraphicObject{
    constructor(d3n,svg,styles) {
        this.d3n = d3n;
        this.svg = svg;
        this.styles = styles;
    }


    /**
     * Genera una gráfica de tipo tarta a partir de un fichero tipo csv
     */
    pieChartExample(){
        const csvString = fs.readFileSync('./routes/graphics/graphic_examples/piechart.csv', 'UTF-8').toString();
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
    }

    /**
     * Genera un mapa/gráfica a partir de un fichero tipo JSON
     */
    jsonExample (){

        const us = require('./graphic_examples/us-states.json'); // source: https://github.com/bradoyler/atlas-make/tree/master/us-states

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
    }

}
module.exports = GraphicObject;
