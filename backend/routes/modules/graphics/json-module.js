const Graphic = require('./graphic-module'),
    topojson = require('topojson'),
    d3 = require('d3');

/**
 * Clase que hereda de Graphic, usada para trabajar con gráficas
 * generadas con JSON.
 * @returns {JsonGraph}
 * @constructor
 */
class JsonGraph extends Graphic{
    constructor(){
super();
    }
    /**
     * Genera un mapa/gráfica a partir de un fichero tipo JSON
     */
    jsonExample (){
        var us = require('./graphic_examples/us-states.json');
        this.setD3Node({
            svgStyles:'.mesh{fill: none;stroke: #333;stroke-width: .5px;stroke-linejoin: round;}'
        });
        this.setSizes(960,500);
        var projection = d3.geo.albersUsa();
        var path = d3.geo.path()
            .projection(projection);

        this.svg = this.d3n.createSVG()
            .attr("width", this.width)
            .attr("height", this.height)
            .append("path")
            .datum(topojson.mesh(us))
            .attr("class", "mesh")
            .attr("d", path);
    }
}
module.exports = JsonGraph;
