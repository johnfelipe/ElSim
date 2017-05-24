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

    static calculateGlobalWithCommunities(data, conjunto,needFinal) {
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

        const calculateProvinces = (community) => {
            let provinces;
            if(community === 'Andalucía'){
                provinces = ['es-co','es-h','es-ma','es-al','es-ca','es-j','es-gr','es-se'];
            }else if(community === 'Aragón'){
                provinces = ['es-te','es-z','es-hu'];
            }else if(community === 'Canarias'){
                provinces = ['es-tf','es-gc'];
            }else if(community === 'Cantabria'){
                provinces = ['es-s'];
            }else if(community === 'Castilla - La Mancha'){
                provinces = ['es-cu','es-gu','es-ab','es-to','es-cr'];
            }else if(community === 'Castilla y León'){
                provinces = ['es-bu','es-sa','es-za','es-sg','es-av','es-so','es-va','es-le','es-p'];
            }else if(community === 'Cataluña'){
                provinces = ['es-t','es-l','es-gi','es-b'];
            }else if(community === 'Ciudad de Ceuta'){
                provinces = ['es-ce'];
            }else if(community === 'Ciudad de Melilla'){
                provinces = ['es-me'];
            }else if(community === 'Comunidad de Madrid'){
                provinces = ['es-m'];
            }else if(community === 'Comunidad Foral de Navarra'){
                provinces = ['es-na'];
            }else if(community === 'Comunitat Valenciana'){
                provinces = ['es-v','es-a','es-cs'];
            }else if(community === 'Extremadura'){
                provinces = ['es-cc','es-ba'];
            }else if(community === 'Galicia'){
                provinces = ['es-c','es-po','es-lu','es-or'];
            }else if(community === 'Illes Balears'){
                provinces = ['es-pm'];
            }else if(community === 'La Rioja'){
                provinces = ['es-lo'];
            }else if(community === 'País Vasco'){
                provinces = ['es-vi','es-ss','es-bi'];
            }else if(community === 'Principado de Asturias'){
                provinces = ['es-o'];
            }else if(community === 'Región de Murcia'){
                provinces = ['es-mu'];
            }else {
                console.error('Error con ' + community);
            }
            return provinces;

        };

        if(needFinal) {
            for (let community in groupedByCommunity) {
                groupedByCommunity[community].provincias = calculateProvinces(community);
                let dhondtConfig = {
                    mandates: groupedByCommunity[community].mandates,
                    percentage: 3.0,
                    blankVotes: groupedByCommunity[community].votos_blanco
                };
                let votes = [];
                let names = [];
                for (let party in groupedByCommunity[community].partidos) {
                    votes.push(groupedByCommunity[community].partidos[party]);
                    names.push(party);
                }
                let d = new District(votes, names, dhondtConfig, false);
                groupedByCommunity[community].resultadoFinal = d.compute();
                for(let party in groupedByCommunity[community].resultadoFinal.parties){
                    if(groupedByCommunity[community].resultadoFinal.parties[party] === 0){
                        delete groupedByCommunity[community].resultadoFinal.parties[party];
                    }
                }
            }
        }


        return groupedByCommunity;
    }

    static calculateGlobalWholeCountry(data, conjunto) {
        let groupedByCommunity = MapChart.calculateGlobalWithCommunities(data, conjunto,false);
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
