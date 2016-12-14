'use strict';
const highcharts = require('node-highcharts'),
    Color = require('./colors'),
    BarChart = require('./bar-module'),
    PieChart = require('./pie-module'),
    CountryChart = require('./map-module'),
    User = require('../../models/user'),
    Result = require('../../models/result'),
    Icons = require('./icons'),
    District = require('../district-module');

/**
 * To handle charts
 * @module modules/graphics/graphic-module
 */
module.exports = {

    /** Rends a chart in the server-side */
    rendChart: function (options, callback) {
        highcharts.render(options, callbackRender);
        function callbackRender(err, data) {
            if (err) {
                console.log('Error: ' + err);
            } else {
                callback(data);
            }
        }
    },

    /** Returns the color for a party or blue if not found */
    chooseColor: function (party) {
        if (Color[party] === undefined) {
            return 'blue';
        }
        return Color[party];
    },

    /** Create a bar chart */
    createBar: function (result, callback) {
        let options = BarChart.fillOptions(result);
        callback(options);
    },

    /** Create a pie chart */
    createPie: function (result, callback) {
        let options = PieChart.fillOptions(result);
        callback(options);
    },

    /** Create a country chart */
    createMap: function(results, callback){
        let options = CountryChart.fillOptions(results);
        callback(options);
    },

    calculateDistrict: function(req,callback){
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

            Object.keys(data.partidos).forEach(iteration);

            function iteration(key) {
                votes.push(data.partidos[key]);
                names.push(key);
            }

            let result = District.compute(votes, names, districtOptions);
            if (mode === 'bar') {
                this.createBar(result.parties, done);
            } else if (mode === 'pie') {
                this.createPie(result.parties, done);
            }

            function done(graph_options) {
                User.findOne({_id: req.user._id}, function (err, user) {
                    if (err) throw err;

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
    },
    calculateCountry: function(req,callback){
        let eleccion = {
            autor: req.body.resultSelected.split(',')[1],
            fecha: req.body.resultSelected.split(',')[0]
        };
        let ContryChart = require('../graphics/map-module');
        Result.find({eleccion: eleccion}, function (err, data) {
            let global;
            global = ContryChart.calculateGlobal(data);
            let options = {
                user: req.user,
                global: global,
                title: 'Country Chart'
            };
            callback(options);
        });
    }
};