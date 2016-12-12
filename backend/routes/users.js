'use strict';
const express = require('express'),
    router = express.Router(),
    User = require('./../models/user');
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
    return router;
};