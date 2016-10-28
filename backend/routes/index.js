/**
 * Routas de la interfaz web
 */

'use strict';
var express = require('express');
var router = express.Router();
var _ = require('./modules/util-module');
var Log = require('./../models/log');
var DB = require('./modules/db-manager-module');
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
