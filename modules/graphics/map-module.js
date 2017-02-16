/* jshint esversion: 6 */
const latinMap = require('./misc/latinize-map'),
    District = require('../district-module');

const has = Object.prototype.hasOwnProperty;

const provincias = [
    'es-NULL', 'es-vi', 'es-ab', 'es-a', 'es-al', 'es-av', 'es-ba', 'es-pm',
    'es-b', 'es-bu', 'es-cc', 'es-ca', 'es-cs', 'es-cr', 'es-co', 'es-c',
    'es-cu', 'es-gi', 'es-gr', 'es-gu', 'es-ss', 'es-h', 'es-hu', 'es-j',
    'es-le', 'es-l', 'es-lo', 'es-lu', 'es-m', 'es-ma', 'es-mu', 'es-na',
    'es-or', 'es-o', 'es-p', 'es-gc', 'es-po', 'es-sa', 'es-tf', 'es-s',
    'es-sg', 'es-se', 'es-so', 'es-t', 'es-te', 'es-to', 'es-v', 'es-va',
    'es-bi', 'es-za', 'es-z', 'es-ce', 'es-ml'
];

/** To handle map charts */
(function () {
    const calculateCode = (cod_provincia) => {
        return provincias[cod_provincia];
    };

    const latinize = (s) => {
        let latinise = {};
        latinise.latin_map = latinMap;
        let regEx = new RegExp(/[^A-Za-z0-9\[\] ]/g);
        return s.replace(regEx, (a) => {
            return latinise.latin_map[a] || a;
        });
    };

    const calculateMandates = (provincia, conjunto) => {
        let regEx = new RegExp("\\s", 'g');
        for (let c in conjunto) {
            if (latinize(provincia.split('/')[0].toLowerCase().replace(regEx, "")) === latinize(c.toLowerCase().replace(regEx, ""))) {
                return parseInt(conjunto[c]);
            }
        }
        return 2; // if the loop does not return anything, return minimum!
    };

    const calculateGlobal = (data, config, conjunto) => {
        let global = globalLoop(data, config, conjunto);
        global.agrupado = groupParties(global);
        return global;
    };

    const globalLoop = (data, config, conjunto) => {
        let votes = [], names = [], result, global = [];

        for (let i = 0, len = data.length; i < len; ++i) {
            config.blankVotes = data[i].votos_blanco;
            config.mandates = calculateMandates(data[i].provincia, conjunto);
            for (let key in data[i].partidos) {
                if (has.call(data[i].partidos, key)) {
                    votes.push(data[i].partidos[key]);
                    names.push(key);
                }
            }
            result = District.compute(votes, names, config, false);
            result.cc = calculateCode(data[i].cod_provincia);
            global.push(result);
            votes = [];
            names = [];
        }

        return global;
    };

    const groupParties = (global) => {
        let aux = {};
        for (let i = 0, len = global.length; i < len; i++) {
            for (let key in global[i].parties) {
                if (has.call(global[i].parties, key) && global[i].parties[key] === 0) {
                    delete global[i].parties[key];
                } else {
                    if (aux[key] === undefined) {
                        aux[key] = 0;
                    }
                    aux[key] += global[i].parties[key];
                }
            }
        }
        return aux;
    };

    module.exports = {
        calculateGlobal: calculateGlobal
    };

})();

