const highcharts = require('node-highcharts'),
    Color = require('./../misc/colors'),
    BarChart = require('./column-chart'),
    PieChart = require('./pie-module'),
    CountryChart = require('./map-chart'),
    User = require('../models/user'),
    Result = require('../models/result'),
    Icons = require('./../misc/icons'),
    District = require('../modules/district'),
    Moment = require('moment'),
    Q = require('q'),
    Timer = require('../misc/timer');

/**
 * @class Chart
 */
class Chart {
    constructor() {

    }

    static chooseColor(party) {
        if (typeof Color[party] === 'undefined') {
            return 'blue';
        }
        return Color[party];
    }

    static createColumn(result) {
        return BarChart.fillOptions(result);
    }

    static createPie(result) {
        return PieChart.fillOptions(result);
    }

    static fillCalculateDistrictOptions(election, graphOptions, result, user) {
        return {
            title: 'Chart',
            autor: election.eleccion.autor,
            fecha: election.eleccion.fecha,
            provincia: election.cod_provincia,
            options: graphOptions,
            result: result,
            icons: Icons,
            user: user,
            moment: Moment
        };
    }

    static addResultToUser(user, election, result, mandates, percentage) {
        let promise = Q.defer();

        const reject = (err) => promise.reject(err);

        User.findOne({_id: user._id})
            .then((user) => {
                if (!user) {
                    reject('User not found');
                    return;
                }
                user.resultados.push({
                    fecha: election.eleccion.fecha,
                    provincia: election.cod_provincia,
                    result: result,
                    mandates: mandates,
                    percentage: percentage,
                    blank: election.votos_blanco
                });

                user.save()
                    .then(promise.resolve)
                    .catch(reject);
            })
            .catch(reject);

        return promise.promise;
    }

    static calculateDistrict(mode, mandates, percentage, resultSelected, user) {
        let promise = Q.defer();

        let timer = new Timer('Distric processing time');
        timer.start();

        let votes = [],
            names = [],
            districtOptions = {
                mandates: mandates,
                percentage: percentage,
                blankVotes: 0
            };

        let result = null,
            election = null;

        const reject = (err) => promise.reject(err);

        Result.findOne({_id: resultSelected})
            .then((data) => {
                if (!data) {
                    reject('Result not found');
                    return;
                }

                election = data;
                districtOptions.blankVotes = data.votos_blanco;

                let keys = Object.keys(data.partidos);
                for (let key of keys) {
                    votes.push(data.partidos[key]);
                    names.push(key);
                }

                let d = new District(votes, names, districtOptions, true);

                result = d.compute();

                timer.end();
                console.info((timer.name).green + ': '.green + timer.finishSeconds() + 's'.green);

                if (mode === 'column') {
                    chartDone(Chart.createColumn(result.parties));
                } else {
                    chartDone(Chart.createPie(result.parties));
                }

            })
            .catch(reject);

        const chartDone = (graph_options) => {
            let options = Chart.fillCalculateDistrictOptions(election, graph_options, result, user);

            if (!user) {
                promise.resolve(options);
            } else {
                Chart.addResultToUser(user, election, result, mandates, percentage)
                    .then(() => promise.resolve(options))
                    .catch(reject);
            }
        };

        return promise.promise;
    }

    static calculateCountry(resultSelected, percentage, user, body) {

        let promise = Q.defer();

        let election = {
            autor: resultSelected.split(',')[1],
            fecha: resultSelected.split(',')[0]
        };

        let config = {
            mandates: 2,
            percentage: parseFloat(percentage),
            blankVotes: 0
        };

        Result.find({eleccion: election})
            .then((data) => {
                if (!data) {
                    promise.reject('Election not found');
                    return;
                }

                let global;

                if (body.wholeCountry) {
                    global = {
                        agrupado: CountryChart.calculateGlobalWholeCountry(data, body, config.percentage).parties
                    };
                } else if (body.aggregateCommunities) {
                    global = {
                        isAggregateCommunities: true,
                        agrupado: CountryChart.calculateGlobalWithCommunities(data, body, true, config.percentage)
                    };
                } else {
                    global = CountryChart.calculateGlobal(data, config, body);
                }

                promise.resolve({
                    user: user,
                    global: global,
                    wholeCountry: body.wholeCountry,
                    communities: body.aggregateCommunities,
                    title: 'Country Chart'
                });
            })
            .catch(promise.reject);

        return promise.promise;
    }
}
module.exports = Chart;