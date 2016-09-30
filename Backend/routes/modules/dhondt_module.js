'use strict';
var dhondt = require('dhondt');
var DbManager = require('./dbmanager_module.js');
var _ = require('./utils_module.js');
/**
 * Clase para gestionar objetos de tipo D'Hondt
 * @returns {DhondtObject}
 * @constructor
 */
class DhondtObject{
    constructor(){
        this.votos = [];
        this.diputados = 8;
        this.partidos = [];
        this.options = {};
        this.done = false;
        DbManager.saveLog('DhondtObject created');
    };
    /**
     * Fija el array de votos, que es un array de enteros.
     * @param {Array} v
     */
    setVotos(v){
        this.done = false;
        this.partidos = [];
        this.options = {};
        this.votos = v;
    };

    /**
     * Fija el número de diputados, que es un entero.
     * @param {number} n
     */
    setDiputados(n){
        if(n > 0) {
            this.done = false;
            this.diputados = n;
        }
    }

    /**
     * Fija los partidos, que es un array de objetos tipo par, que incluyen
     * nombre del partido como una cadena y número de votos como un entero.
     * @param {Array.<Object>} p
     */
    setPartidos(p){
        this.done = false;
        this.votos = [];
        this.partidos = p;
    }

    /**
     * Fija las opciones de configuración(opcional)
     * @param {Object} o
     */
    setOptions(o){
        this.done = false;
        this.options = o;
    }

    /**
     * Inicializa this.votos y this.diputados para poder monstrar un ejemplo
     * de tipo I.
     */
    initExampleOne(){
        this.setVotos([150000,125000,115000,90000,50000,800]);
        this.setDiputados(10);
    }
    /**
     * Inicializa this.diputados, this.partidos y this.options para poder mostrar un ejemplo
     * de tipo II.
     */
    initExampleTwo(){
        this.setDiputados(10);
        this.setPartidos([
            { partido:'A', votos: 150000 },
            { partido:'B', votos: 125000 },
            { partido:'C', votos: 115000 },
            { partido:'D', votos: 90000 },
            { partido:'E', votos: 50000 },
            { partido:'F', votos: 800 }
        ]);
        this.setOptions({
            voteAccessor: function (object) {
                return object.votos
            },
            resultProperty: "diputados",
            base: 1.42
        });
    }

    /**
     * Función encargada de realizar el cálculo de los resultados.
     */
    compute(){
        if(!this.done) {
            this.done = true;
            if (this.partidos.length === 0) {
                return dhondt.compute(this.votos, this.diputados);
            } else if (this.votos.length === 0) {
                return dhondt.compute(this.partidos, this.diputados, this.options);
            }
        } else {
            _.prettyPrint('No new calculations...\n');
        }
    }
}
module.exports = DhondtObject;
