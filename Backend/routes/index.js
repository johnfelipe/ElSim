var express = require('express');
var router = express.Router();
var api = require('./api.js');
var _ = require('./modules/utils_module.js');
/**
 * Rutas para la interfaz web
 */



/**
 * Rutas GET de la api
 */
router.get('/api/', api.alive);
router.get('/api/utils/add', api.add);
router.get('/api/utils/logs', api.getLogs);
router.get('/api/utils/logs/delete', api.cleanLogs);
router.get('/api/examples/hareExample', api.hareExample);
router.get('/api/graphics/examples/barChartExample',api.barChartExample);
router.get('/api/graphics/examples/pieChartExample',api.pieChartExample);
router.get('/api/graphics/examples/jsonExample',api.jsonExample);

/**
 * Rutas POST de la api
 */


/**
 * Ruta de test, para testear cosas fácilmente.
 */
router.get('/test', function(req,res){
    _.prettyPrint('Hola');
    res.send('test');
});


module.exports = router;
