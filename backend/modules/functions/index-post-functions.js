'use strict';
const User = require('./../../models/user'),
    Graphic = require('./../graphics/graphic-module'),
    Result = require('./../../models/result'),
    District = require('./../district-module'),
    Promise = require('bluebird'),
    Icons = require('./../graphics/icons');

/**
 * All the callback functions of index POST routes
 * @module modules/functions/index-post-functions
 */
module.exports = {
    addDataPostFunction: function (req, res) {
        let lines = req.param('votes').split('\n'),
            partidos = {}, aux;
        for (let i = 0, len = lines.length; i < len; i++) {
            aux = lines[i].split(' ');
            partidos[aux[0].replace(/(\r\n|\n|\r)/gm, "")] = aux[2].replace(/(\r\n|\n|\r)/gm, "");
        }
        let result = new Result({
            comunidad: 'desconocida',
            cod_provincia: req.param('province'),
            provincia: 'desconocida',
            poblacion: req.param('population'),
            num_mesas: req.param('tables'),
            total_censo_electoral: req.param('census'),
            total_votantes: req.param('voters'),
            votos_validos: 0,
            votos_candidaturas: 0,
            votos_blanco: req.param('blancos'),
            votos_nulos: req.param('nulos'),
            eleccion: {
                autor: req.param('author'),
                fecha: req.param('date')
            },
            partidos: partidos
        });
        result.save(function (err) {
            if (err) throw err;
            let options = {
                title: 'Add data',
                error: 'NO',
                codigos: require('./../../codigos'),
                user: req.user
            };
            res.render('pages/add-data', options);
        });

    },

    deleteDataPostFunction: function (req, res) {
        let promises = [], options;

        for (let i = 0, len = req.param('results').length; i < len; i++) {
            options = {_id: req.param('results')[i]};
            promises.push(Result.remove(options, removed));
        }
        function removed(err) {
            if (err) throw err;
        }

        Promise.all(files).then(function () {
            console.log('all the results were deleted');
            Result.find({}, function (err, data) {
                let options = {
                    title: 'Delete data',
                    error: 'NO',
                    data: data,
                    user: req.user
                };
                res.render('pages/delete-data', options);
            });
        });

    },
    graphicFormPostFunction: function (req, res) {
        let votes = [],
            names = [],
            mode = req.body.mode,
            options = {
                mandates: req.body.mandates,
                percentage: req.body.percentage,
                blankVotes: 0
            },
            id = req.body.resultSelected;

        Result.findOne({_id: id}, haveResult);

        function haveResult(err, data) {
            if (err) throw err;

            options.blankVotes = data.votos_blanco;

            Object.keys(data.partidos).forEach(iteration);

            function iteration(key) {
                votes.push(data.partidos[key]);
                names.push(key);
            }

            let result = District.compute(votes, names, options);
            if (mode === 'bar') {
                Graphic.createBar(result.parties, done);
            } else if (mode === 'pie') {
                Graphic.createPie(result.parties, done);
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
                        res.render('pages/single-chart', options);
                    });
                });
            }
        }
    },
    countryFormPostFunction: function (req, res) {
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
            res.render('pages/country-chart', options);
        });

    },

    saveResultFunction: function (req, res) {
        console.log(req.body.result);
        res.send({result: req.body.result});
    }
};
