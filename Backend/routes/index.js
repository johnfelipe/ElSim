var express = require('express');
var router = express.Router();
var functions = require('./functions.js');
var api = require('./api.js');

router.get('/', functions.index);


router.get('/api/', api.alive);
router.get('/api/add', api.add);
router.get('/api/hareExample', api.hareExample);
router.get('/api/barChartExample',api.barChartExample);
router.get('/api/pieChartExample',api.pieChartExample);
router.get('/api/jsonExample',api.jsonExample);


module.exports = router;
