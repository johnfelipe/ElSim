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
    _.readCsv();
    res.send({result:'test'});

});



module.exports = router;
