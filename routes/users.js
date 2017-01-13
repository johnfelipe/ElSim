/* jshint esversion: 6 */
'use strict';
const express = require('express'),
    router = express.Router(),
    User = require('../models/user'),
    Log = require('../models/log'),
    Result = require('../models/result'),
    Subscriber = require('../models/subscriber'),
    Mailer = require('../modules/mailer');
const isAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.render('pages/profile', {
        title: 'Profile',
        user: req.user,
        advice: 'Sorry, but you must to login to see your profile!'
    });
};
/**
 * Rutas de la interfaz web relativas a usuarios
 */
module.exports = function (passport) {
    router.get('/profile', isAuthenticated, function (req, res) {
        User.findOne({_id: req.user._id}, function (err, user) {
            if (err) throw err;
            let options = {
                title: 'Profile',
                user: req.user,
                advice: false
            };
            res.render('pages/profile', options);
        });
    });

    router.post('/addSubscriber', function(req,res){
        let s = new Subscriber({
           email: req.body.subscriber,
            options: {}
        });

        s.save(function(err){
            if(err) throw err;
            let options = {
                title: 'Help',
                user: req.user,
                err: err
            };
            res.render('pages/help',options);
        });
    });
    router.post('/sendNews',function(req,res){
        Subscriber.find({},function(err,subscribers){
            if(err) throw err;
            let mails = [];
            for(let s of subscribers){
                mails.push(s.email);
            }
            Mailer.sendMail(mails,'TEST',function(err,result){
                console.log('ERROR: ' + err,'RESULT: ' + result);
                let promises = [], users, logs, results;
                promises.push(
                    User.find({}, function (err, data) {
                        users = data;
                    })
                );
                promises.push(
                    Log.find({}, function (err, data) {
                        logs = data;
                    })
                );
                promises.push(
                    Result.find({}, function (err, data) {
                        results = data;
                    })
                );
                Promise.all(promises).then(function(){
                    let options = {
                        user: req.user,
                        title: 'Administration',
                        logs: logs,
                        results: results,
                        users: users
                    };
                    res.render('pages/admin', options);
                });
            })

        })
    });
    return router;
};