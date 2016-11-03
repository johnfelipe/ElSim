/**
 * Rutas de la interfaz web
 */

'use strict';
const express = require('express'),
    router = express.Router(),
    Log = require('./../models/log'),
    Graphic = require('./../modules/graphics/graphic-module');
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
router.get('/chart-example', function(req,res){
    var c = new Graphic();
    c.generateExample(function (data) {
        console.log(data);
        res.send(data);
    });

});

module.exports = router;
