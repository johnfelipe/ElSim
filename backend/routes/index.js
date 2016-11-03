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
router.get('/chart-example/:html', function(req,res){
    var c = new Graphic();
    c.generateExample(function (data) {
        if(req.param('html') === '1'){
            res.render('graphic',{
                title: 'HTML Rendering',
                options: c.options
            });
        }else {
            throw new Error('Not yet implemented!');
        }
    });

});

module.exports = router;
