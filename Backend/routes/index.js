var express = require('express');
var router = express.Router();
var functions = require('./functions.js');
var api = require('./api.js');


/**
 * Rutas para la interfaz web
 */
router.get('/', functions.index);


/**
 * Rutas de la api
 */
router.get('/api/', api.alive);
router.get('/api/add', api.add);
router.get('/api/hareExample', api.hareExample);
router.get('/api/barChartExample',api.barChartExample);
router.get('/api/rawBarChartExample',api.rawBarChartExample);
router.get('/api/pieChartExample',api.pieChartExample);
router.get('/api/jsonExample',api.jsonExample);

/**
 * Ruta de test, para testear cosas fácilmente.
 */
router.get('/test', function(req,res){
    var ss = require('simple-statistics');
    var a = ['a','a','b','c'];
    var grupos = ss.ckmeans(a,3);
    console.log('\nOriginal:');
    console.log('-------------------------');
    console.log(a);
    console.log('\nGrupos:');
    console.log('-------------------------');
    for(var i = 0, len = grupos.length; i < len; i++){
        console.log(grupos[i]);
    }
    res.send('ok');
});


module.exports = router;
