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
    var time = new Date().getTime();
    var Utils = require('./modules/utils_module.js');
    var u = new Utils();
    var partidos = ['PP', 'PSOE', 'PODEMOS', 'CIUDADANOS'];
    var a = [];
    var n_votos = 40000000;
    for(var i = 0; i < n_votos; i++){
        a.push(partidos[Math.floor((Math.random() * 4))]);
    }
    u.escrutinioSimple(a);
    var finalTime =  new Date().getTime() - time;
    res.send({
        input:'array[' + n_votos + ']',
        output: u.resultado,
        time: (finalTime / 1000) + ' s'
    });
});


module.exports = router;
