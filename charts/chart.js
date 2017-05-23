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
    Q = require('q');

/**
 * @class Chart
 */
class Chart {
    constructor() {

    }

    static chooseColor(party) {
        if (Color[party] === undefined) {
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

    static fillCalculateDistrictOptions(ellection, graph_options, result, user) {
        return {
            title: 'Chart',
            autor: ellection.eleccion.autor,
            fecha: ellection.eleccion.fecha,
            provincia: ellection.cod_provincia,
            options: graph_options,
            result: result,
            icons: Icons,
            user: user,
            moment: Moment
        };
    }

    static addResultToUser(user, ellection, result, mandates, percentage) {
        let promise = Q.defer();

        const reject = (err) => promise.reject(err);

        User.findOne({_id: user._id})
            .then((user) => {
                user.resultados.push({
                    fecha: ellection.eleccion.fecha,
                    provincia: ellection.cod_provincia,
                    result: result,
                    mandates: mandates,
                    percentage: percentage,
                    blank: ellection.votos_blanco
                });

                user.save()
                    .then(() => promise.resolve())
                    .catch(reject);
            })
            .catch(reject);

        return promise.promise;
    }

    static calculateDistrict(mode, mandates, percentage, resultSelected, user) {
        let promise = Q.defer();

        let votes = [],
            names = [],
            districtOptions = {
                mandates: mandates,
                percentage: percentage,
                blankVotes: 0
            };

        let result = null,
            ellection = null;

        const reject = (err) => promise.reject(err);

        Result.findOne({_id: resultSelected})
            .then((data) => {

                ellection = data;
                districtOptions.blankVotes = data.votos_blanco;

                let keys = Object.keys(data.partidos);
                for (let key of keys) {
                    votes.push(data.partidos[key]);
                    names.push(key);
                }

                let d = new District(votes, names, districtOptions, true);

                result = d.compute();

                if (mode === 'column') {
                    chartDone(Chart.createColumn(result.parties));
                } else {
                    chartDone(Chart.createPie(result.parties));
                }

            })
            .catch(reject);

        const chartDone = (graph_options) => {
            let options = Chart.fillCalculateDistrictOptions(ellection, graph_options, result, user);

            if (!user) {
                promise.resolve(options);
            } else {
                Chart.addResultToUser(user, ellection, result, mandates, percentage)
                    .then(() => promise.resolve(options))
                    .catch(reject);
            }
        };

        return promise.promise;
    }

    static calculateCountry(resultSelected, percentage, user, body) {

        let promise = Q.defer();

        let ellection = {
            autor: resultSelected.split(',')[1],
            fecha: resultSelected.split(',')[0]
        };

        console.info(body);


        let config = {
            mandates: 2,
            percentage: parseFloat(percentage),
            blankVotes: 0
        };

        Result.find({eleccion: ellection})
            .then((data) => {
                let global;

                if (body.wholeCountry) {
                    global = {
                        agrupado: CountryChart.calculateGlobalWholeCountry(data, body).parties
                    };
                } else if (body.aggregateCommunities) {
                    console.info('Not yet implemented calculate by communities.');
                    promise.reject('Not yet implemented');
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
            .catch((err) => promise.reject(err));
        return promise.promise;
    }
}
module.exports = Chart;