/* jshint esversion: 6 */

const highcharts = require('node-highcharts'),
    Color = require('./colors'),
    BarChart = require('./column-module'),
    PieChart = require('./pie-module'),
    CountryChart = require('./map-module'),
    User = require('../../models/user'),
    Result = require('../../models/result'),
    Icons = require('./icons'),
    District = require('../district-module');
/**
 * To handle charts
 * @module Graphic
 */
(function () {


    function rendChart(options, callback) {
        highcharts.render(options, callbackRender);
        function callbackRender(err, data) {
            if (err) {
                console.log('Error: ' + err);
            } else {
                callback(data);
            }
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

    function calculateDistrict(req, callback) {
        let votes = [],
            names = [],
            mode = req.body.mode,
            districtOptions = {
                mandates: req.body.mandates,
                percentage: req.body.percentage,
                blankVotes: 0
            },
            id = req.body.resultSelected;

        Result.findOne({_id: id}, haveResult);

        function haveResult(err, data) {
            if (err) throw err;

            districtOptions.blankVotes = data.votos_blanco;

            for (let key in data.partidos) {
                votes.push(data.partidos[key]);
                names.push(key);
            }


            let result = District.compute(votes, names, districtOptions);
            if (mode === 'column') {
                createColumn(result.parties, done);
            } else if (mode === 'pie') {
                createPie(result.parties, done);
            }

            function done(graph_options) {
                let options = {
                    title: 'Chart',
                    autor: data.eleccion.autor,
                    fecha: data.eleccion.fecha,
                    provincia: data.cod_provincia,
                    options: graph_options,
                    result: result,
                    icons: Icons,
                    user: req.user
                };
                if (!req.user) {
                    callback(options);
                } else {
                    User.findOne({_id: req.user._id}, function (err, user) {
                        if (err) throw err;

                        user.resultados.push({
                            fecha: data.eleccion.fecha,
                            provincia: data.cod_provincia,
                            result: result,
                            mandates: req.body.mandates,
                            percentage: req.body.percentage,
                            blank: data.votos_blanco
                        });

                        user.save(function (err) {
                            if (err) throw err;
                            callback(options);
                        });
                    });
                }
            }
        }
    }

    function calculateCountry(req, callback) {
        let eleccion = {
            autor: req.body.resultSelected.split(',')[1],
            fecha: req.body.resultSelected.split(',')[0]
        };
        let config = {
            mandates: 2,
            percentage: parseFloat(req.body.percentage),
            blankVotes: 0
        };

        let ContryChart = require('../graphics/map-module');
        Result.find({eleccion: eleccion}, function (err, data) {
            let global;
            global = ContryChart.calculateGlobal(data, config, req.body);
            let options = {
                user: req.user,
                global: global,
                title: 'Country Chart'
            };
            callback(options);
        });
    }

    module.exports = {
        /**
         * @description
         * @function
         */
        rendChart: rendChart,

        /**
         * @description
         * @function
         */
        chooseColor: chooseColor,

        /**
         * @description
         * @function
         */
        createColumn: createColumn,

        /**
         * @description
         * @function
         */
        createPie: createPie,

        /**
         * @description
         * @function
         */
        createMap: createMap,

        /**
         * @description Do something
         * @param req {request}
         * @param callback {function}
         * @function
         */
        calculateDistrict: calculateDistrict,

        /**
         * @description
         * @function
         */
        calculateCountry: calculateCountry
    };
})();
