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

    const createColumn = (result, callback) => {
        let options = BarChart.fillOptions(result);
        callback(options);
    };

    const createPie = (result, callback) => {
        let options = PieChart.fillOptions(result);
        callback(options);
    };

    const createMap = (results, callback) => {
        let options = CountryChart.fillOptions(results);
        callback(options);
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

    const addResultToUser = (user, ellection, result, mandates, percentage, callback) => {
        User.findOne({_id: user._id}, (err, user) => {
            if (err) {
                throw err;
            }

            user.resultados.push({
                fecha: ellection.eleccion.fecha,
                provincia: ellection.cod_provincia,
                result: result,
                mandates: mandates,
                percentage: percentage,
                blank: ellection.votos_blanco
            });

            user.save((err) => {
                if (err) {
                    throw err;
                }
                callback();
            });
        });
    };

    const calculateDistrict = (mode, mandates, percentage, resultSelected, user, callback) => {
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

                if(mode === 'column') {
                    createColumn(result.parties, chartDone);
                } else  {
                    createPie(result.parties, chartDone);
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
                addResultToUser(user, ellection, result, mandates, percentage, () => {
                    promise.resolve(options);
                });
            }
        };

        return promise.promise;
    };

    const calculateCountry = (resultSelected, percentage, user, body, done) => {
        let ellection = {
            autor: resultSelected.split(',')[1],
            fecha: resultSelected.split(',')[0]
        };

        let config = {
            mandates: 2,
            percentage: parseFloat(percentage),
            blankVotes: 0
        };

        const findCallback = (err, data) => {
            if (err) {
                throw err;
            }

            let global;

            if (body.wholeCountry) {
                global = {
                    agrupado: CountryChart.calculateGlobalWholeCountry(data, config, body).parties
                };
            } else {
                global = CountryChart.calculateGlobal(data, config, body);
            }

            done({
                user: user,
                global: global,
                wholeCountry: body.wholeCountry,
                communities: body.aggregateCommunities,
                title: 'Country Chart'
            });
        };
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
