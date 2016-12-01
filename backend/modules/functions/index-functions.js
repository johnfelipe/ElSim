'use strict';
const Log = require('./../../models/log'),
    Graphic = require('./../graphics/graphic-module'),
    Result = require('./../../models/result'),
    District = require('./../district-module'),
    Promise = require('bluebird'),
    Icons = require('./../graphics/icons'),
    Util = require('./../util-module');

/**
 * All the callback functions of index routes
 * @module modules/functions/index-functions
 */
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
            let ellections = [];
            for(let i = 0, len = data.length; i < len; i++){
                if(!Util.ellectionIsInArray(data[i].eleccion,ellections)){
                    ellections.push(data[i].eleccion);
                }
            }
            console.dir(ellections);
            let options = {
                title: 'Create a graphic!',
                results: data,
                ellections: ellections
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

    storedDataFunction: function (req, res) {
        let options = {
            title: 'Stored Data'
        };
        res.render('pages/stored-data', options);
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

        Promise.all(files).then(function () {
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
                let options = {
                    title: 'Graphic Example',
                    autor: data.eleccion.autor,
                    fecha: data.eleccion.fecha,
                    provincia: data.cod_provincia,
                    options: graph_options,
                    result: result,
                    icons: Icons
                };
                res.render('pages/graphic', options);
            }
        }
    }
};
