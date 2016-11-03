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

}
module.exports = JsonGraph;
