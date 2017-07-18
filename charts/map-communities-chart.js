const District     = require('../modules/district');
const MapChartUtil = require('./map-chart-util');
const has          = Object.prototype.hasOwnProperty;

module.exports = (data, conjunto, needFinal, communityPercentage) => {
    let groupedByCommunity = {};

    for (let i = 0, len = data.length; i < len; i++) {

        if (!has.call(groupedByCommunity, data[i].community)) {
            groupedByCommunity[data[i].community] = {
                election        : data[i].election,
                community       : data[i].community,
                population      : parseInt(data[i].population),
                total_voters    : parseInt(data[i].total_voters),
                valid_votes     : parseInt(data[i].valid_votes),
                votes_to_parties: parseInt(data[i].votes_to_parties),
                blank_votes     : parseInt(data[i].blank_votes),
                null_votes      : parseInt(data[i].null_votes),
                parties         : data[i].parties,
                mandates        : parseInt(MapChartUtil.calculateMandates(data[i].province, conjunto))
            };

            for (let key in groupedByCommunity[data[i].community].parties) {
                if (has.call(groupedByCommunity[data[i].community].parties, key)) {
                    groupedByCommunity[data[i].community].parties[key] = parseInt(groupedByCommunity[data[i].community].parties[key]);
                }
            }

        } else {

            groupedByCommunity[data[i].community].mandates += parseInt(MapChartUtil.calculateMandates(data[i].province, conjunto));
            groupedByCommunity[data[i].community].population += data[i].population;
            groupedByCommunity[data[i].community].total_voters += data[i].total_voters;
            groupedByCommunity[data[i].community].valid_votes += data[i].valid_votes;
            groupedByCommunity[data[i].community].votes_to_parties += data[i].votes_to_parties;
            groupedByCommunity[data[i].community].blank_votes += data[i].blank_votes;
            groupedByCommunity[data[i].community].null_votes += data[i].null_votes;

            let keys = Object.keys(data[i].parties);
            for (let key of keys) {
                if (has.call(groupedByCommunity[data[i].community].parties, key)) {
                    groupedByCommunity[data[i].community].parties[key] += parseInt(data[i].parties[key]);
                } else {
                    groupedByCommunity[data[i].community].parties[key] = parseInt(data[i].parties[key]);
                }
            }
            for (let key of keys) {
                if (groupedByCommunity[data[i].community].parties[key] === 0) {
                    delete groupedByCommunity[data[i].community].parties[key];
                }
            }
        }
    }

    if (needFinal) {
        for (let community in groupedByCommunity) {
            groupedByCommunity[community].provinces = MapChartUtil.calculateProvinces(community);

            let dhondtConfig = {
                mandates  : groupedByCommunity[community].mandates,
                percentage: (typeof communityPercentage !== 'undefined') ? parseFloat(communityPercentage) : 3.0,
                blankVotes: groupedByCommunity[community].blank_votes
            };

            let votes   = [];
            let names   = [];
            let parties = Object.keys(groupedByCommunity[community].parties);

            for (let party of parties) {
                votes.push(groupedByCommunity[community].parties[party]);
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
};
