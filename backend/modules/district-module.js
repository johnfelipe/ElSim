'use strict';
const dhondt = require('dhondt');
/**
 * District
 */
module.exports = {

    /**
     *
     */
    compute: function (votes, mandates) {
        return dhondt.compute(votes, mandates);
    },

    /**
     *
     * @param districts
     * @returns {number}
     */
    calculateTotalPopulation: function (districts) {
        if (!Array.isArray(districts)) throw new Error('Use an array instead.');
        var total = 0;
        for (var i = 0, len = districts.length; i < len; i++) {
            total += districts[i].poblacion;
        }
        return total;
    },

    /**
     *
     * @param districts
     * @returns {number}
     */
    calculateQuote: function (districts) {
        if (!Array.isArray(districts)) throw new Error('Use an array instead.');
        var population = District.calculateTotalPopulation(districts),
            quote = population / 248.00;
        return quote;
    },

    /**
     *
     * @param district
     * @param quote
     * @returns {{integer: number, float: number}}
     */
    calculateMandates: function (district, quote) {
        var total = {
            'integer': 2,
            'float': 2.0
        };

        if (district.cod_provincia > 50) {
            total.integer = 1;
            total.float = 1.0;
        } else {
            total.float += (district.total_votantes / quote);
            total.integer += Math.floor(total.float);
        }
        return total;
    },

    /**
     *
     * @param districts
     */
    fixMandates: function (districts) {
        if (!Array.isArray(districts)) throw new Error('Use an array instead.');
        var m = 0, i, len, restante;

        for (i = 0, len = districts.length; i < len; i++) {
            m += districts[i].mandates.integer;
        }

        districts.sort(function (a, b) {
            return parseFloat(b.mandates.float) - parseFloat(a.mandates.float);
        });

        restante = 350 - m;

        for (i = 0; i < restante; i++) {
            districts[i].mandates.integer++;
        }
    }

};
