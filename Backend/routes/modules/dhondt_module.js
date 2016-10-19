'use strict';
var _ = require('./utils_module'),
    dhondt = require('dhondt');
/**
 * Clase D'Hondt
 */
class Dhondt {
    constructor(){
        this.votes = [];
        this.mandates = 0;
        this.results = [];
    }

    /**
     *
     * @param v
     */
    setVotes(v){
        this.votes = v;
    }

    /**
     *
     * @param m
     */
    setMandates(m){
        this.mandates = m;
    }

    /**
     *
     * @returns {*|Array}
     */
    getResults(){
        return this.results;
    }

    /**
     *
     */
    compute(){
        this.results = dhondt.compute(this.votes, this.mandates);
    }

    /**
     *
     * @param provincias
     * @returns {number}
     */
    static calculateTotalPopulation(provincias){
        var total = 0;
        for(var i = 0, len = provincias.length; i < len; i++){
            total += provincias[i].poblacion;
        }
        return total;
    }

    /**
     *
     * @param provincias
     * @returns {number}
     */
    static calculateCuota(provincias){
        var poblacion = Dhondt.calculateTotalPopulation(provincias);
        var cuota = poblacion / 248.00;
        return cuota;
    }

    /**
     *
     * @param provincia
     * @param cuota
     * @returns {{entero: number, decimal: number}}
     */
    static calculateMandates(provincia,cuota){
        var total = {
            'entero' : 2,
            'decimal' : 2.0
        };
        if(provincia.cod_provincia > 50 ) {
            total.entero = 1;
            total.decimal = 1.0;
        } else {
            total.decimal += (provincia.total_votantes / cuota);
            total.entero += Math.floor(total.decimal);
        }
        return total;
      // Los Diputados restantes se distribuyen asignando uno a cada una de las
      // provincias cuyo cociente, obtenido conforme al apartado anterior,
      // tenga una fracción decimal mayor.
   }

   static fixMandates(provincias){
       var m = 0;
       var i,len;
       for(i = 0, len = provincias.length; i < len; i++){
           m += provincias[i].mandates.entero;
       }
       provincias.sort(function(a, b) {
           return parseFloat(b.mandates.decimal) - parseFloat(a.mandates.decimal);
       });
       var restante = 350 - m;
       for(i = 0; i < restante; i++){
           provincias[i].mandates.entero += 1;
       }
   }

}
module.exports = Dhondt;
