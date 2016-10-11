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

router.get('/resultados/cleancsv',function(req,res){
    DB.cleanResultado(function(){
        res.send({result:'Resultado cleaned'});
    });
});

router.get('/resultados/:anio',function(req,res){
    DB.getResultadoByAnio(req.param('anio'),function(data){
        res.send({result:data});
    });
});

router.get('/resultados/loadcsv',function(req,res){
    DB.loadCsv(function(){
        res.send({result:'Executed'});
    });
});

router.get('/resultados',function(req,res){
    Resultado.find({},function(err,data){
        res.send({result:data});
    });
});



module.exports = router;
