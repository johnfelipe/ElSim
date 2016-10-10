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
    var a = ['1977','1979','1982','1986','1989','1993','1996'];

    var i, len = a.length, path1, path2;
    for(i = 0; i < len; ++i){
        path1 = './csv/' + a[i] + '.csv';
        path2 = './csv/' + a[i] + '_PARTIDOS.csv';
        _.readCsv(path1,path2,
            function (data){
                var j, lenData = data.length;
                for(j = 0; j < lenData; ++j){
                    DB.saveResultado(data[j],function(){ });
                }
            }
        );
    }

    res.send({result:'Executed'});
});

router.get('/resultados',function(req,res){
    Resultado.find({},function(err,data){
        res.send({result:data});
    });
});



module.exports = router;
