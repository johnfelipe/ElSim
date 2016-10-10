'use strict';
var express = require('express');
var router = express.Router();
var api = require('./api.js');
var _ = require('./modules/utils_module.js');
var DB = require('./modules/dbmanager_module');
var Resultado = require('./../models/resultado');
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
        './1977.csv','./1977_PARTIDOS.csv',
        function(data){
            var i, len = data.length;
            var r;
            for(i = 0; i < len; ++i){
                r = new Resultado(data[i]);
                r.save(function(err){
                    if(err) {
                        console.log(err);
                    }
                });
            }
            Resultado.find({},function(err,resultados){
                res.send({
                    result: resultados
                });
            });
        });
});

router.get('/showdb',function(req,res){
    var Log = require('./../models/log');
    var User = require('./../models/user');
    var Resultado = require('./../models/resultado');
    Log.find({},function(err,data){
        //_.prettyPrint(data);
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
