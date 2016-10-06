'use strict';
var _ = require('./utils_module');
var Sistema = require('./sistema');
/**
 * Clase para gestionar objetos de tipo D'Hondt
 * @returns {DhondtObject}
 * @constructor
 */
class DhondtObject extends Sistema{
    constructor(){
    };
    /**
     * Fija el array de votos, que es un array de enteros.
     * @param {Array} v
     */
    setVotos(v){
    };

    /**
     * Fija el número de diputados, que es un entero.
     * @param {number} n
     */
    setDiputados(n){
    }

    /**
     * Fija los partidos, que es un array de objetos tipo par, que incluyen
     * nombre del partido como una cadena y número de votos como un entero.
     * @param {Array.<Object>} p
     */
    setPartidos(p){

    }

    /**
     * Fija las opciones de configuración(opcional)
     * @param {Object} o
     */
    setOptions(o){
    }


    /**
     * Función encargada de realizar el cálculo de los resultados.
     */
    compute(){

    }
}
module.exports = DhondtObject;
