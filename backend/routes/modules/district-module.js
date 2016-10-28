'use strict';
const dhondt = require('dhondt');
/**
 * District
 */
class District {
    constructor(){
        this.votes = [];
        this.mandates = 0;
        this.results = [];
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
     * @param districts
     * @returns {number}
     */
    static calculateQuote(districts){
        var population = District.calculateTotalPopulation(districts),
            quote = population / 248.00;
        return quote;
    }

    /**
     *
     * @param district
     * @param quote
     * @returns {{entero: number, decimal: number}}
     */
    static calculateMandates(district,quote){
        var total = {
            'integer' : 2,
            'float' : 2.0
        };
        if(district.cod_provincia > 50 ) {
            total.integer = 1;
            total.float = 1.0;
        } else {
            total.float += (provincia.total_votantes / quote);
            total.integer += Math.floor(total.float);
        }
        return total;
    }

    /**
     *
     * @param districts
     */
    static fixMandates(districts){
        var m = 0,
            i,
            len;

        for(i = 0, len = districts.length; i < len; i++){
            m += districts[i].mandates.integer;
        }

        districts.sort(function(a, b) {
            return parseFloat(b.mandates.float) - parseFloat(a.mandates.float);
        });

        var restante = 350 - m;

        for(i = 0; i < restante; i++){
            districts[i].mandates.integer += 1;
        }
    }

}
module.exports = District;
