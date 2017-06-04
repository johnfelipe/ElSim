const District = require('../modules/district');
const has = Object.prototype.hasOwnProperty;
const MapCommunitiesChart = require('./map-communities-chart');

/** Handles a Map like chart */
class MapWholeChart {

    /**
     *
     * @param data
     * @param conjunto
     * @param p
     * @return {*}
     */
    static calculateGlobalWholeCountry(data, conjunto, p) {
        let groupedByCommunity = MapCommunitiesChart.calculateGlobalWithCommunities(data, conjunto, false, p);
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

        let keys = Object.keys(partidos);
        for (let partido of keys) {
            votes.push(partidos[partido]);
            names.push(partido);
        }

        let d = new District(votes, names, dhondtConfig, false);

        let result = d.compute();
        keys = Object.keys(result.parties);
        for(let key of keys){
            if(result.parties[key] === 0){
                delete result.parties[key];
            }
        }

        return result;
    }
}
module.exports = MapWholeChart;
