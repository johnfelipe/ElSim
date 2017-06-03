const District = require('../modules/district');
const console = require('better-console');
const Latinize = require('../misc/latinize');
const latinize = Latinize.latinize;
const has = Object.prototype.hasOwnProperty;
const provincias = Latinize.getProvincias();
const Timer = require('../misc/timer');

/** Handles a Map like chart */
class MapChart {
    /**
     *
     * @param cod_provincia
     * @return {*}
     */
    static calculateCode(cod_provincia) {
        return provincias[cod_provincia];
    }

    /**
     *
     * @param provincia
     * @param conjunto
     * @return {*}
     */
    static calculateMandates(provincia, conjunto) {
        let regEx = new RegExp("\\s", 'g');

        if (latinize(provincia.split('/')[0].toLowerCase().replace(regEx, "")) === 'araba-alava') {
            return parseInt(conjunto.alava);
        }

        let keys = Object.keys(conjunto);
        for (let c of keys) {
            if (latinize(provincia.split('/')[0].toLowerCase().replace(regEx, "")) === latinize(c.toLowerCase().replace(regEx, ""))) {
                return parseInt(conjunto[c]);
            }
        }

        return 2;
    }

    /**
     *
     * @param data
     * @param config
     * @param conjunto
     * @return {Array}
     */
    static globalLoop(data, config, conjunto) {
        let votes = [], names = [], result, global = [];

        for (let i = 0, len = data.length; i < len; ++i) {
            config.blankVotes = data[i].votos_blanco;
            config.mandates = MapChart.calculateMandates(data[i].provincia, conjunto);

            let keys = Object.keys(data[i].partidos);

            for (let key of keys) {
                votes.push(data[i].partidos[key]);
                names.push(key);
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

    /**
     *
     * @param global
     * @return {{}}
     */
    static groupParties(global) {
        let aux = {};
        for (let i = 0, len = global.length; i < len; i++) {

            let keys = Object.keys(global[i].parties);

            for (let key of keys) {
                if (global[i].parties[key] === 0) {
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

    /**
     *
     * @param data
     * @param config
     * @param conjunto
     * @return {Array}
     */
    static calculateGlobal(data, config, conjunto) {
        let timer = new Timer('Map processing time');
        timer.start();
        let global = MapChart.globalLoop(data, config, conjunto);
        global.agrupado = MapChart.groupParties(global);
        timer.end();
        console.info((timer.name).green + ': '.green + timer.finishSeconds() + 's'.green);
        return global;
    }

    /**
     *
     * @param community
     * @return {*}
     */
    static calculateProvinces(community) {
        let provinces;
        if (community.includes('Andalucía')) {
            provinces = ['es-co', 'es-h', 'es-ma', 'es-al', 'es-ca', 'es-j', 'es-gr', 'es-se'];
        } else if (community.includes('Aragón')) {
            provinces = ['es-te', 'es-z', 'es-hu'];
        } else if (community.includes('Canarias')) {
            provinces = ['es-tf', 'es-gc'];
        } else if (community.includes('Cantabria')) {
            provinces = ['es-s'];
        } else if (community.includes('Castilla - La Mancha')) {
            provinces = ['es-cu', 'es-gu', 'es-ab', 'es-to', 'es-cr'];
        } else if (community.includes('Castilla y León')) {
            provinces = ['es-bu', 'es-sa', 'es-za', 'es-sg', 'es-av', 'es-so', 'es-va', 'es-le', 'es-p'];
        } else if (community.includes('Cataluña')) {
            provinces = ['es-t', 'es-l', 'es-gi', 'es-b'];
        } else if (community.includes('Ciudad de Ceuta')) {
            provinces = ['es-ce'];
        } else if (community.includes('Ciudad de Melilla')) {
            provinces = ['es-me'];
        } else if (community.includes('Comunidad de Madrid')) {
            provinces = ['es-m'];
        } else if (community.includes('Comunidad Foral de Navarra')) {
            provinces = ['es-na'];
        } else if (community.includes('Comunitat Valenciana')) {
            provinces = ['es-v', 'es-a', 'es-cs'];
        } else if (community.includes('Extremadura')) {
            provinces = ['es-cc', 'es-ba'];
        } else if (community.includes('Galicia')) {
            provinces = ['es-c', 'es-po', 'es-lu', 'es-or'];
        } else if (community.includes('Illes Balears')) {
            provinces = ['es-pm'];
        } else if (community.includes('La Rioja')) {
            provinces = ['es-lo'];
        } else if (community.includes('País Vasco')) {
            provinces = ['es-vi', 'es-ss', 'es-bi'];
        } else if (community.includes('Principado de Asturias')) {
            provinces = ['es-o'];
        } else if (community.includes('Región de Murcia')) {
            provinces = ['es-mu'];
        } else {
            console.error('Error with ' + community);
        }
        return provinces;
    }

    /**
     *
     * @param data
     * @param conjunto
     * @param needFinal
     * @param communityPercentage
     * @return {{}}
     */
    static calculateGlobalWithCommunities(data, conjunto, needFinal, communityPercentage) {
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
                for (let key of keys) {
                    if (groupedByCommunity[data[i].comunidad].partidos[key] === 0) {
                        delete groupedByCommunity[data[i].comunidad].partidos[key];
                    }
                }
            }
        }

        if (needFinal) {
            for (let community in groupedByCommunity) {
                groupedByCommunity[community].provincias = MapChart.calculateProvinces(community);

                let dhondtConfig = {
                    mandates: groupedByCommunity[community].mandates,
                    percentage: (typeof communityPercentage !== 'undefined') ? parseFloat(communityPercentage) : 3.0,
                    blankVotes: groupedByCommunity[community].votos_blanco
                };

                let votes = [];
                let names = [];

                let parties = Object.keys(groupedByCommunity[community].partidos);

                for (let party of parties) {
                    votes.push(groupedByCommunity[community].partidos[party]);
                    names.push(party);
                }

                let d = new District(votes, names, dhondtConfig, false);

                groupedByCommunity[community].resultadoFinal = d.compute();

                parties = Object.keys(groupedByCommunity[community].resultadoFinal.parties);

                for (let party of parties) {
                    if (groupedByCommunity[community].resultadoFinal.parties[party] === 0) {
                        delete groupedByCommunity[community].resultadoFinal.parties[party];
                    }
                }
            }
        }
        return groupedByCommunity;
    }

    /**
     *
     * @param data
     * @param conjunto
     * @param p
     * @return {*}
     */
    static calculateGlobalWholeCountry(data, conjunto, p) {
        let groupedByCommunity = MapChart.calculateGlobalWithCommunities(data, conjunto, false, p);
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
            percentage: p,
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
