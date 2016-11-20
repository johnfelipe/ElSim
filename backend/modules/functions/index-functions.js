'use strict';
const Log = require('./../../models/log'),
    Graphic = require('./../graphics/graphic-module'),
    Result = require('./../../models/result'),
    District = require('./../district-module'),
    Promise = require('bluebird');

module.exports = {
    indexGetFunction: function (req, res) {
        Log.find({}, haveLog);
        function haveLog(err, data) {
            if (err) throw err;
            let options = {
                title: 'Welcome Page',
                logs: data,
                moment: require('moment')
            };
            res.render('pages/index', options);
        }
    },

    helpGetFunction: function (req, res) {
        let options = {
            title: 'Help Page'
        };
        res.render('pages/help', options);
    },

    leafletExampleGetFunction: function (req, res) {
        let options = {
            title: 'LeafletJS example'
        };
        res.render('pages/leaflet-example', options);
    },

    graphicFormGetFunction: function (req, res) {
        Result.find({}, haveResult);
        function haveResult(err, data) {
            if (err) throw err;
            let options = {
                title: 'Create a graphic!',
                results: data
            };
            res.render('pages/graphic-form', options);
        }
    },

    learnGetFunction: function (req, res) {
        let options = {
            title: 'Learn'
        };
        res.render('pages/learn', options);
    },

    addDataGetFunction: function (req, res) {
        let options = {
            title: 'Add data',
            error: 'NO',
            codigos: require('./../../codigos')
        };
        res.render('pages/add-data', options);
    },

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
                codigos: require('./../../codigos')
            };
            res.render('pages/add-data', options);
        });

    },

    deleteDataGetFunction: function (req, res) {
        Result.find({}, function (err, data) {
            let options = {
                title: 'Delete data',
                error: 'NO',
                data: data
            };
            res.render('pages/delete-data', options);
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
        Promise.all(files).then(function() {
            console.log('all the results were deleted');
            Result.find({}, function (err, data) {
                let options = {
                    title: 'Delete data',
                    error: 'NO',
                    data: data
                };
                res.render('pages/delete-data', options);
            });
        });

    },

    graphicFormPostFunction: function (req, res) {
        let votes = [],
            resultados = [],
            aux = {},
            mode = req.body.mode,
            mandates = req.body.mandates,
            id = req.body.resultSelected;

        Result.find({_id: id}, haveResult);

        function haveResult(err, data) {
            if (err) throw err;
            Object.keys(data[0].partidos).forEach(iteration);

            function iteration(key) {
                votes.push(data[0].partidos[key]);
                aux = {
                    partido: key,
                    votes: data[0].partidos[key],
                    mandates: 0
                };
                resultados.push(aux);
            }

            let results = District.compute(votes,mandates);

            for (let i = 0, len = results.length; i < len; i++) resultados[i].mandates = results[i];

            if (mode === 'bar') {
                Graphic.createBar(resultados, done);
            }
            if (mode === 'pie') {
                Graphic.createPie(resultados, done);
            }

            function done(graph_options) {
                let options = {
                    title: 'Graphic Example',
                    autor: data[0].eleccion.autor,
                    fecha: data[0].eleccion.fecha,
                    provincia: data[0].cod_provincia,
                    options: graph_options
                };
                res.render('pages/graphic', options);
            }
        }
    }
};
