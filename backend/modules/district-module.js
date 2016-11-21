'use strict';
const dhondt = require('dhondt');

/**
 * Utilities for a district
 * @module modules/district-module
 */
module.exports = {

    /** Calculate the result of a district */
    compute: function (votes, mandates) {
        return dhondt.compute(votes, mandates);

    },

    /** Calculate the total population of a set of districts */
    calculateTotalPopulation: function (districts) {
        if (!Array.isArray(districts)) throw new Error('Use an array instead.');
        let total = 0;
        for (let i = 0, len = districts.length; i < len; i++) {
            total += districts[i].poblacion;
        }
        return total;
    },

    /** */
    calculateQuote: function (districts) {
        if (!Array.isArray(districts)) throw new Error('Use an array instead.');
        let population = District.calculateTotalPopulation(districts),
            quote = population / 248.00;
        return quote;
    },

    calculateMandates: function (district, quote) {
        let total = {
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

    fixMandates: function (districts) {
        if (!Array.isArray(districts)) throw new Error('Use an array instead.');
        let m = 0, i, len, restante;

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
