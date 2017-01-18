/* jshint esversion: 6 */
'use strict';
const express = require('express'),
    router = express.Router(),
    UF = require('../modules/functions/user-functions');
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
    router.get('/profile', isAuthenticated, UF.profile);
    router.post('/addSubscriber', UF.addSubscriber);
    router.post('/sendNews',UF.sendNews);
    return router;
};