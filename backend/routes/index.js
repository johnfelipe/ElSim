/**
 * Rutas de la interfaz web
 */

'use strict';
const express = require('express'),
    router = express.Router(),
    Log = require('./../models/log'),
    BarChart = require('./../modules/graphics/bar-module');
/**
 * Welcome route.
 */
router.get('/', function(req,res){
    Log.find({},function(err,data){
        if(err) throw err;
        res.render('index', {
            title : 'Welcome Page',
            logs : data,
            moment: require('moment')
        });
    });
});
router.get('/leaflet-example', function(req,res){
    res.render('leaflet-example', {
        title : 'LeafletJS example'
    });
});
router.get('/bar-chart-example', function(req,res){
    var bc = new BarChart();
    bc.barChartExample();
    console.dir(bc);
    res.send(bc.svg.svg.parentNode);
});

module.exports = router;
