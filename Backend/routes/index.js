/**
 * Routas de la interfaz web
 */

'use strict';
var express = require('express');
var router = express.Router();
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


module.exports = router;
