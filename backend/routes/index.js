/**
 * Rutas de la interfaz web
 */

'use strict';
const express = require('express'),
    router = express.Router(),
    Log = require('./../models/log'),
    Graphic = require('./../modules/graphics/graphic-module'),
    Result = require('./../models/result'),
    District = require('./../modules/district-module');

/**
 * Welcome route.
 */
router.get('/', function (req, res) {
    Log.find({}, haveLog);
    function haveLog(err, data) {
        if (err) throw err;
        var options = {
            title: 'Welcome Page',
            logs: data,
            moment: require('moment')
        };
        res.render('pages/index', options);
    }
});

/**
 * Leaflet Example Route
 */
router.get('/leaflet-example', function (req, res) {
    var options = {
        title: 'LeafletJS example'
    };
    res.render('pages/leaflet-example', options);
});

/**
 * GET Form to create graphs with stored results
 */
router.get('/graphic-form', function (req, res) {
    Result.find({}, haveResult);
    function haveResult(err, data) {
        if (err) throw err;
        var options = {
            title: 'Create a graphic!',
            results: data
        };
        res.render('pages/graphic-form', options);
    }
});

/**
 * POST show the graph generated by the form
 */
router.post('/graphic-form', function (req, res) {
    var c = new Graphic(),
        d = new District(),
        votes = [],
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

        d.mandates = mandates;
        d.votes = votes;
        d.compute();

        for (var i = 0, len = d.results.length; i < len; i++) resultados[i].mandates = d.results[i];

        if (mode === 'bar') c.createBar(resultados, done);
        if (mode === 'pie') c.createPie(resultados, done);

        function done() {
            var options = {
                title: 'Graphic Example',
                autor: data[0].eleccion.autor,
                fecha: data[0].eleccion.fecha,
                provincia: data[0].cod_provincia,
                options: c.options
            };
            res.render('pages/graphic', options);
        }
    }
});

module.exports = router;
