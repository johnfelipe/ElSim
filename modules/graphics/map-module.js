/* jshint esversion: 6 */
const latinMap = require('./latinize-map');

let District = require('../district-module');
/**
 * To handle map charts
 * @module graphics/map-module
 */
(function () {
    function calculateCode(cod_provincia) {
        const provincias = [
            'es-NULL', 'es-vi', 'es-ab', 'es-a', 'es-al', 'es-av', 'es-ba', 'es-pm',
            'es-b', 'es-bu', 'es-cc', 'es-ca', 'es-cs', 'es-cr', 'es-co', 'es-c',
            'es-cu', 'es-gi', 'es-gr', 'es-gu', 'es-ss', 'es-h', 'es-hu', 'es-j',
            'es-le', 'es-l', 'es-lo', 'es-lu', 'es-m', 'es-ma', 'es-mu', 'es-na',
            'es-or', 'es-o', 'es-p', 'es-gc', 'es-po', 'es-sa', 'es-tf', 'es-s',
            'es-sg', 'es-se', 'es-so', 'es-t', 'es-te', 'es-to', 'es-v', 'es-va',
            'es-bi', 'es-za', 'es-z', 'es-ce', 'es-ml'
        ];
        return provincias[cod_provincia];
    }


    function calculateMandates(provincia, conjunto) {
        let Latinise = {};
        Latinise.latin_map = latinMap;
        String.prototype.latinise = function () {
            return this.replace(/[^A-Za-z0-9\[\] ]/g, function (a) {
                return Latinise.latin_map[a] || a
            })
        };
        String.prototype.latinize = String.prototype.latinise;
        console.log(provincia);
        for (let c in conjunto) {
            if (provincia.split('/')[0].toLowerCase().replace(new RegExp("\\s", 'g'), "").latinize() === c.toLowerCase().replace(new RegExp("\\s", 'g'), "").latinize()) {
                return parseInt(conjunto[c]);
            }
        }
        return 2;
    }

    function calculateGlobal(data, config, conjunto) {
        let votes = [],
            names = [],
            result;
        let global = [];
        let i, len = data.length;
        console.log(conjunto);
        for (i = 0; i < len; i++) {
            config.blankVotes = data[i].votos_blanco;
            config.mandates = calculateMandates(data[i].provincia, conjunto);
            for (let key in data[i].partidos) {
                votes.push(data[i].partidos[key]);
                names.push(key);
            }
            result = District.compute(votes, names, config);
            result['cc'] = calculateCode(data[i].cod_provincia);
            global.push(result);
            votes = [];
            names = [];
        }


        for (i = 0, len = global.length; i < len; i++) {
            for (let key in global[i].parties) {
                if (global[i].parties[key] === 0) {
                    delete global[i].parties[key];
                }
            }
        }
        return global;
    }

    module.exports = {
        /**
         * @description
         * @function
         */
        calculateGlobal: calculateGlobal
    };

})();

