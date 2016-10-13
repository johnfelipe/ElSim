/**
 * Routas de la interfaz web
 */

'use strict';
var express = require('express');
var router = express.Router();
var _ = require('./modules/utils_module');
var Log = require('./../models/log');
var DB = require('./modules/dbmanager_module');
/**
 * Welcome route.
 */
router.get('/', function(req,res){
    DB.saveLog('GET index view',function(){});
    Log.find({},function(err,data){
        if(err) throw err;
        res.render('index', {
            title : 'Welcome Page',
            logs : data
        });
    });
});


module.exports = router;
