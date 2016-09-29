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
router.get('/api/utils/add', api.add);
router.get('/api/utils/logs', api.getLogs);
router.get('/api/graphics/examples/hareExample', api.hareExample);
router.get('/api/graphics/examples/barChartExample',api.barChartExample);
router.get('/api/graphics/examples/rawBarChartExample',api.rawBarChartExample);
router.get('/api/graphics/examples/pieChartExample',api.pieChartExample);
router.get('/api/graphics/examples/jsonExample',api.jsonExample);

/**
 * Ruta de test, para testear cosas fácilmente.
 */
router.get('/test', function(req,res){
    res.send('test');
});


module.exports = router;
