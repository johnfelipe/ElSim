/**
 * Rutas de la interfaz web
 */

'use strict';
const express = require('express'),
    router = express.Router(),
    Log = require('./../models/log'),
    Graphic = require('./../modules/graphics/graphic-module'),
    Result = require('./../models/result');
/**
 * Welcome route.
 */
router.get('/', function(req,res){
    Log.find({},function(err,data){
        if(err) throw err;
        res.render('pages/index', {
            title : 'Welcome Page',
            logs : data,
            moment: require('moment')
        });
    });
});
router.get('/leaflet-example', function(req,res){
    res.render('pages/leaflet-example', {
        title : 'LeafletJS example'
    });
});

router.get('/graphic-form', function(req,res){
    Result.find({},function(err,data) {
        if(err) throw err;
        res.render('pages/graphic-form', {
            title: 'Create a graphic!',
            results: data
        });
    });
});
router.post('/graphic-form', function(req,res){
    var c = new Graphic();
    var District = require('./../modules/district-module');
    Result.find({_id:req.body.resultSelected},function(err,data){
        var d = new District(),
            votes = [],
            resultados = [];

        Object.keys(data[0].partidos).forEach(function (key) {
            votes.push(data[0].partidos[key]);
            resultados.push({
                partido: key,
                votes: data[0].partidos[key],
                mandates: 0
            })
        });
        d.mandates = 350;
        d.votes = votes;
        d.compute();
        for(var i = 0, len = d.results.length; i < len; i++){
            resultados[i].mandates = d.results[i];
        }
        c.setOptions(resultados,function(){
            res.render('pages/graphic',{
                title: 'Graphic Example',
                options: c.options
            });
        })
    });
});


router.get('/chart-example/:html', function(req,res){
    var c = new Graphic();
    var District = require('./../modules/district-module');
    Result.find({},function(err,data){
        var d = new District(),
            votes = [],
            resultados = [];

        Object.keys(data[0].partidos).forEach(function (key) {
            votes.push(data[0].partidos[key]);
            resultados.push({
                partido: key,
                votes: data[0].partidos[key],
                mandates: 0
            })
        });
        d.mandates = 350;
        d.votes = votes;
        d.compute();
        for(var i = 0, len = d.results.length; i < len; i++){
            resultados[i].mandates = d.results[i];
        }
        c.setOptions(resultados,function(){
            res.render('pages/graphic',{
                title: 'Graphic Example',
                options: c.options
            });
        })
    });

});

module.exports = router;
