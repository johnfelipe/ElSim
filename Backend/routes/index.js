'use strict';
var express = require('express');
var router = express.Router();
var api = require('./api.js');
var _ = require('./modules/utils_module.js');

/**
 * Welcome route.
 */
router.get('/', function(req,res){
    _.prettyPrint('Hola');
    res.render('index', {
        title: 'Welcome Page'
    });
});
router.get('/test',function(req,res){
    _.readCsv(
        './TEST.csv','./TEST_PARTIDOS.csv',
        function(data){
            res.send({
                result: data
            });
        }
    );
});
router.get('/showdb',function(req,res){
    var Log = require('./../models/log');
    var User = require('./../models/user');
    var Resultado = require('./../models/resultado');
    Log.find({},function(err,data){
       _.prettyPrint(data);
        User.find({},function(err,data){
            _.prettyPrint(data);
            Resultado.find({},function (err,data){
                _.prettyPrint(data);
                res.send({result: 'showdb'});
            });
        });
    });
});



module.exports = router;
