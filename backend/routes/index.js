/**
 * Rutas de la interfaz web
 */

'use strict';
const express = require('express'),
    router = express.Router(),
    Log = require('./../models/log');
/**
 * Welcome route.
 */
router.get('/', function(req,res){
    Log.find({},function(err,data){
        if(err) throw err;
        res.render('index', {
            title : 'Welcome Page',
            logs : data,
            moment: require('moment')
        });
    });
});


module.exports = router;
