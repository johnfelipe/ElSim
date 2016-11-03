const Graphic = require('./graphic-module'),
    fs = require('fs'),
    d3 = require('d3');

/**
 * Clase que hereda de Graphic, usada para trabajar con gráficas
 * tipo tarta(pie en inglés).
 * @returns {Pie}
 * @constructor
 */
class Pie extends Graphic{
    constructor(){
        super();
    }


}
module.exports = Pie;
