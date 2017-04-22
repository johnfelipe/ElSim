/* jshint esversion: 6 */

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
 *
 * @module graphic-module
 */
{
    const rendChart = (options, callback) => {
        highcharts.render(options, (err, data) => {
            if (err) {
                throw err;
            }
            callback(data);
        });
    };

    const chooseColor = (party) => {
        if (Color[party] === undefined) {
            return 'blue';
        }
        return Color[party];
    };

    const createColumn = (result) => {
        return BarChart.fillOptions(result);
    };

    const createPie = (result) => {
        return PieChart.fillOptions(result);
    };

    const createMap = (results) => {
        return CountryChart.fillOptions(results);
    };

    const fillCalculateDistrictOptions = (ellection, graph_options, result, user) => {
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
    };

    const addResultToUser = (user, ellection, result, mandates, percentage) => {
        let promise = Q.defer();

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
                    .then(() => {
                        promise.resolve();
                    })
                    .catch((err) => {
                        promise.reject(err);
                    });
            })
            .catch((err) => {
                promise.reject(err);
            });

        return promise.promise;
    };

    const calculateDistrict = (mode, mandates, percentage, resultSelected, user) => {
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

        Result.findOne({_id: resultSelected})
            .then((data) => {

                ellection = data;
                districtOptions.blankVotes = data.votos_blanco;

                for (let key in data.partidos) {
                    if (data.partidos.hasOwnProperty(key)) {
                        votes.push(data.partidos[key]);
                        names.push(key);
                    }
                }

                result = District.compute(votes, names, districtOptions, true);

                if (mode === 'column') {
                    chartDone(createColumn(result.parties));
                } else {
                    chartDone(createPie(result.parties));
                }

            })
            .catch((err) => {
                promise.reject(err);
            });

        const chartDone = (graph_options) => {
            let options = fillCalculateDistrictOptions(ellection, graph_options, result, user);

            if (!user) {
                promise.resolve(options);
            } else {
                addResultToUser(user, ellection, result, mandates, percentage)
                    .then(() => {
                        promise.resolve(options);
                    })
                    .catch((err) => {
                        promise.reject(err);
                    });
            }
        };

        return promise.promise;
    };

    const calculateCountry = (resultSelected, percentage, user, body) => {

        let promise = Q.defer();

        let ellection = {
            autor: resultSelected.split(',')[1],
            fecha: resultSelected.split(',')[0]
        };

        let config = {
            mandates: 2,
            percentage: parseFloat(percentage),
            blankVotes: 0
        };

        Result.find({eleccion:ellection})
            .then((data) => {
                let global;

                if (body.wholeCountry) {
                    global = {
                        agrupado: CountryChart.calculateGlobalWholeCountry(data, config, body).parties
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
            .catch((err)=> {
                promise.reject(err);
            });
        return promise.promise;
    };


    module.exports = {
        rendChart,
        chooseColor,
        createColumn,
        createPie,
        createMap,
        calculateDistrict,
        calculateCountry
    };
}
