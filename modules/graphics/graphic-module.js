/* jshint esversion: 6 */

const highcharts = require('node-highcharts'),
    Color = require('./misc/colors'),
    BarChart = require('./column-module'),
    PieChart = require('./pie-module'),
    CountryChart = require('./map-module'),
    User = require('../../models/user'),
    Result = require('../../models/result'),
    Icons = require('./misc/icons'),
    District = require('../district-module'),
    Moment = require('moment');

/**
 * To handle charts
 * @module Graphic
 */
(function () {
    function rendChart(options, callback) {
        highcharts.render(options, callbackRender);
        function callbackRender(err, data) {
            if (err)
                throw err;
            callback(data);
        }
    }

    function chooseColor(party) {
        if (Color[party] === undefined) {
            return 'blue';
        }
        return Color[party];
    }


    function createColumn(result, callback) {
        let options = BarChart.fillOptions(result);
        callback(options);
    }


    function createPie(result, callback) {
        let options = PieChart.fillOptions(result);
        callback(options);
    }


    function createMap(results, callback) {
        let options = CountryChart.fillOptions(results);
        callback(options);
    }

    function calculateDistrict(mode, mandates, percentage, resultSelected, user, callback) {
        let votes = [],
            names = [],
            districtOptions = {
                mandates: mandates,
                percentage: percentage,
                blankVotes: 0
            };
        let result = null,
            ellection = null;
        Result.findOne({_id: resultSelected}, findCallback);

        function findCallback(err, data) {
            if (err) throw err;

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
                createColumn(result.parties, chartDone);
            } else if (mode === 'pie') {
                createPie(result.parties, chartDone);
            }
        }

        function chartDone(graph_options) {
            console.log(ellection);
            let options = {
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
            if (!user) {
                callback(options);
            } else {
                User.findOne({_id: user._id}, function (err, user) {
                    if (err) throw err;

                    user.resultados.push({
                        fecha: ellection.eleccion.fecha,
                        provincia: ellection.cod_provincia,
                        result: result,
                        mandates: mandates,
                        percentage: percentage,
                        blank: ellection.votos_blanco
                    });

                    user.save(function (err) {
                        if (err) throw err;
                        callback(options);
                    });
                });
            }
        }
    }

    function calculateCountry(resultSelected, percentage, user, body, callback) {
        let ellection = {
            autor: resultSelected.split(',')[1],
            fecha: resultSelected.split(',')[0]
        };
        let config = {
            mandates: 2,
            percentage: parseFloat(percentage),
            blankVotes: 0
        };

        Result.find({eleccion: ellection}, findCallback);

        function findCallback(err, data) {
            if (err) throw err;

            let global = CountryChart.calculateGlobal(data, config, body);

            let options = {
                user: user,
                global: global,
                title: 'Country Chart'
            };
            callback(options);
        }
    }

    module.exports = {
        rendChart: rendChart,
        chooseColor: chooseColor,
        createColumn: createColumn,
        createPie: createPie,
        createMap: createMap,
        calculateDistrict: calculateDistrict,
        calculateCountry: calculateCountry
    };
})();
