/* jshint esversion: 6 */
const latinMap = require('./../misc/latinize-map'),
    District = require('../modules/district'),
    console = require('better-console');

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

/**
 *
 * @module map-module
 */
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
        if (provincia === 'Araba - Álava') {
            return conjunto.alava;
        }
        for (let c in conjunto) {
            if (latinize(provincia.split('/')[0].toLowerCase().replace(regEx, "")) === latinize(c.toLowerCase().replace(regEx, ""))) {
                return parseInt(conjunto[c]);
            }
        }
        return 2;
    };

    const calculateGlobal = (data, config, conjunto) => {
        console.time('Cálculo de elección general...');
        let global = globalLoop(data, config, conjunto);
        global.agrupado = groupParties(global);
        console.timeEnd('Cálculo de elección general...');
        return global;
    };

    const globalLoop = (data, config, conjunto) => {
        let votes = [], names = [], result, global = [];
        for (let i = 0, len = data.length; i < len; ++i) {
            config.blankVotes = data[i].votos_blanco;
            config.mandates = calculateMandates(data[i].provincia, conjunto);
            for (let key in data[i].partidos) {
                if (data[i].partidos.hasOwnProperty(key)) {
                    votes.push(data[i].partidos[key]);
                    names.push(key);
                }
            }
            result = District.compute(votes, names, config, false);
            result.cc = calculateCode(data[i].cod_provincia);
            console.warn('PP en ' + data[i].provincia + ' --> ' + result.parties.PP);
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

    const calculateGlobalWithCommunities = (data, config, conjunto) => {
        let groupedByCommunity = {};
        for (let i = 0, len = data.length; i < len; i++) {
            if (!has.call(groupedByCommunity, data[i].comunidad)) {
                groupedByCommunity[data[i].comunidad] = {
                    eleccion: data[i].eleccion,
                    comunidad: data[i].comunidad,
                    poblacion: parseInt(data[i].poblacion),
                    total_votantes: parseInt(data[i].total_votantes),
                    votos_validos: parseInt(data[i].votos_validos),
                    votos_candidaturas: parseInt(data[i].votos_candidaturas),
                    votos_blanco: parseInt(data[i].votos_blanco),
                    votos_nulos: parseInt(data[i].votos_nulos),
                    partidos: data[i].partidos,
                    mandates: parseInt(calculateMandates(data[i].provincia, conjunto))
                };

                for (let key in groupedByCommunity[data[i].comunidad].partidos) {
                    if (has.call(groupedByCommunity[data[i].comunidad].partidos, key)) {
                        groupedByCommunity[data[i].comunidad].partidos[key] = parseInt(groupedByCommunity[data[i].comunidad].partidos[key]);
                    }
                }
            } else {
                groupedByCommunity[data[i].comunidad].mandates += parseInt(calculateMandates(data[i].provincia, conjunto));
                groupedByCommunity[data[i].comunidad].poblacion += data[i].poblacion;
                groupedByCommunity[data[i].comunidad].total_votantes += data[i].total_votantes;
                groupedByCommunity[data[i].comunidad].votos_validos += data[i].votos_validos;
                groupedByCommunity[data[i].comunidad].votos_candidaturas += data[i].votos_candidaturas;
                groupedByCommunity[data[i].comunidad].votos_blanco += data[i].votos_blanco;
                groupedByCommunity[data[i].comunidad].votos_nulos += data[i].votos_nulos;
                for (let key in data[i].partidos) {
                    if (has.call(groupedByCommunity[data[i].comunidad].partidos, key)) {
                        groupedByCommunity[data[i].comunidad].partidos[key] += parseInt(data[i].partidos[key]);
                    } else {
                        groupedByCommunity[data[i].comunidad].partidos[key] = parseInt(data[i].partidos[key]);
                    }
                }
            }
        }
        return groupedByCommunity;
    };

    const calculateGlobalWholeCountry = (data, config, conjunto) => {
        let groupedByCommunity = calculateGlobalWithCommunities(data, config, conjunto);
        let partidos = {}, votes = [], names = [];
        let blankVotes = 0;
        for (let key in groupedByCommunity) {
            if (has.call(groupedByCommunity, key)) {
                blankVotes += parseInt(groupedByCommunity[key].votos_blanco);
                for (let partido in groupedByCommunity[key].partidos) {
                    if (has.call(partidos, partido)) {
                        partidos[partido] += parseInt(groupedByCommunity[key].partidos[partido]);
                    } else {
                        partidos[partido] = parseInt(groupedByCommunity[key].partidos[partido]);
                    }
                }
            }
        }

        let dhondtConfig = {
            mandates: 350,
            percentage: 3.0,
            blankVotes: blankVotes
        };

        for (let partido in partidos) {
            if (has.call(partidos, partido)) {
                votes.push(partidos[partido]);
                names.push(partido);
            }
        }

        return District.compute(votes, names, dhondtConfig, false);
    };


    module.exports = {
        calculateGlobal,
        calculateGlobalWholeCountry,
        calculateGlobalWithCommunities
    };

})();

