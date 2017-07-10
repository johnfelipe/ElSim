const District            = require('../modules/district');
const has                 = Object.prototype.hasOwnProperty;
const MapCommunitiesChart = require('./map-communities-chart');

/** Handles a Map Whole Country charts */
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

        let parties    = {};
        let votes      = [];
        let names      = [];
        let blankVotes = 0;

        let communityKeys = Object.keys(groupedByCommunity);
        for (let key of communityKeys) {
            blankVotes += parseInt(groupedByCommunity[key].blank_votes);

            let partiesKeys = Object.keys(groupedByCommunity[key].parties);

            for (let partido of partiesKeys) {
                if (has.call(parties, partido)) {
                    parties[partido] += parseInt(groupedByCommunity[key].parties[partido]);
                } else {
                    parties[partido] = parseInt(groupedByCommunity[key].parties[partido]);
                }
            }
        }

        let dhondtConfig = {
            mandates  : 350,
            percentage: p,
            blankVotes
        };

        let keys = Object.keys(parties);

        for (let partido of keys) {
            votes.push(parties[partido]);
            names.push(partido);
        }

        let d = new District(votes, names, dhondtConfig, false);

        let result = d.compute();

        keys = Object.keys(result.parties);

        for (let key of keys) {
            if (result.parties[key] === 0) {
                delete result.parties[key];
            }
        }

        return result;
    }
}
module.exports = MapWholeChart;
