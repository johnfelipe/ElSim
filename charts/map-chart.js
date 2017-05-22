
const District = require('../modules/district'),
    console = require('better-console'),
    Latinize = require('../misc/latinize'),
    latinize = Latinize.latinize;

const has = Object.prototype.hasOwnProperty;
const provincias = Latinize.getProvincias();

class MapChart {
    constructor() {

    }

    static calculateCode(cod_provincia) {
        return provincias[cod_provincia];
    }

    static calculateMandates(provincia, conjunto) {
        let regEx = new RegExp("\\s", 'g');

        if (MapChart.latinize(provincia.split('/')[0].toLowerCase().replace(regEx, "")) === 'araba-alava') {
            return parseInt(conjunto.alava);
        }

        let keys = Object.keys(conjunto);
        for (let c of keys) {
            if (MapChart.latinize(provincia.split('/')[0].toLowerCase().replace(regEx, "")) === MapChart.latinize(c.toLowerCase().replace(regEx, ""))) {
                return parseInt(conjunto[c]);
            }
        }

        return 2;
    }

    static globalLoop(data, config, conjunto) {
        let votes = [], names = [], result, global = [];

        for (let i = 0, len = data.length; i < len; ++i) {
            config.blankVotes = data[i].votos_blanco;
            config.mandates = MapChart.calculateMandates(data[i].provincia, conjunto);
            for (let key in data[i].partidos) {
                if (data[i].partidos.hasOwnProperty(key)) {
                    votes.push(data[i].partidos[key]);
                    names.push(key);
                }
            }

            let d = new District(votes, names, config, false);

            result = d.compute();

            result.cc = MapChart.calculateCode(data[i].cod_provincia);
            global.push(result);
            votes = [];
            names = [];
        }
        return global;
    }

    static groupParties(global) {
        let aux = {};
        for (let i = 0, len = global.length; i < len; i++) {
            for (let key in global[i].parties) {

                if (has.call(global[i].parties, key) && global[i].parties[key] === 0) {
                    delete global[i].parties[key];
                } else {
                    if (typeof aux[key] === 'undefined') {
                        aux[key] = 0;
                    }
                    aux[key] += global[i].parties[key];
                }
            }
        }
        return aux;
    }

    static calculateGlobal(data, config, conjunto) {
        console.time('Cálculo de elección general...');
        let global = MapChart.globalLoop(data, config, conjunto);
        global.agrupado = MapChart.groupParties(global);
        console.timeEnd('Cálculo de elección general...');
        return global;
    }

    static calculateGlobalWithCommunities(data, conjunto) {
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
                    mandates: parseInt(MapChart.calculateMandates(data[i].provincia, conjunto))
                };

                for (let key in groupedByCommunity[data[i].comunidad].partidos) {
                    if (has.call(groupedByCommunity[data[i].comunidad].partidos, key)) {
                        groupedByCommunity[data[i].comunidad].partidos[key] = parseInt(groupedByCommunity[data[i].comunidad].partidos[key]);
                    }
                }

            } else {

                groupedByCommunity[data[i].comunidad].mandates += parseInt(MapChart.calculateMandates(data[i].provincia, conjunto));
                groupedByCommunity[data[i].comunidad].poblacion += data[i].poblacion;
                groupedByCommunity[data[i].comunidad].total_votantes += data[i].total_votantes;
                groupedByCommunity[data[i].comunidad].votos_validos += data[i].votos_validos;
                groupedByCommunity[data[i].comunidad].votos_candidaturas += data[i].votos_candidaturas;
                groupedByCommunity[data[i].comunidad].votos_blanco += data[i].votos_blanco;
                groupedByCommunity[data[i].comunidad].votos_nulos += data[i].votos_nulos;

                let keys = Object.keys(data[i].partidos);
                for (let key of keys) {
                    if (has.call(groupedByCommunity[data[i].comunidad].partidos, key)) {
                        groupedByCommunity[data[i].comunidad].partidos[key] += parseInt(data[i].partidos[key]);
                    } else {
                        groupedByCommunity[data[i].comunidad].partidos[key] = parseInt(data[i].partidos[key]);
                    }
                }
            }
        }
        return groupedByCommunity;
    }

    static calculateGlobalWholeCountry(data, conjunto) {
        let groupedByCommunity = MapChart.calculateGlobalWithCommunities(data, conjunto);
        let partidos = {}, votes = [], names = [];
        let blankVotes = 0;

        let communityKeys = Object.keys(groupedByCommunity);
        for (let key of communityKeys) {
            blankVotes += parseInt(groupedByCommunity[key].votos_blanco);

            let partidosKeys = Object.keys(groupedByCommunity[key].partidos);

            for (let partido of partidosKeys) {
                if (has.call(partidos, partido)) {
                    partidos[partido] += parseInt(groupedByCommunity[key].partidos[partido]);
                } else {
                    partidos[partido] = parseInt(groupedByCommunity[key].partidos[partido]);
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
        let d = new District(votes, names, dhondtConfig, false);

        return d.compute();

    }
}
module.exports = MapChart;
