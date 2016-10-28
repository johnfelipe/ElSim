/**
 * Routas de la interfaz web
 */

'use strict';
const express = require('express'),
    router = express.Router(),
    Log = require('./../models/log'),
    DB = require('./modules/db-manager-module');
/**
 * Welcome route.
 */
router.get('/', function(req,res){
    DB.saveLog('GET index view',function(){});
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
