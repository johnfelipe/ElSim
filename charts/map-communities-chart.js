const District = require('../modules/district');
const has = Object.prototype.hasOwnProperty;
const MapChartUtil = require('./map-chart-util');

/** Handles a Map like chart */
class MapCommunitiesChart {

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
                    mandates: parseInt(MapChartUtil.calculateMandates(data[i].provincia, conjunto))
                };

                for (let key in groupedByCommunity[data[i].comunidad].partidos) {
                    if (has.call(groupedByCommunity[data[i].comunidad].partidos, key)) {
                        groupedByCommunity[data[i].comunidad].partidos[key] = parseInt(groupedByCommunity[data[i].comunidad].partidos[key]);
                    }
                }

            } else {

                groupedByCommunity[data[i].comunidad].mandates += parseInt(MapChartUtil.calculateMandates(data[i].provincia, conjunto));
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
                groupedByCommunity[community].provincias = MapChartUtil.calculateProvinces(community);

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
}
module.exports = MapCommunitiesChart;
