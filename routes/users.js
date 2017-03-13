/* jshint esversion: 6 */
'use strict';
const express = require('express'),
    router = express.Router(),
    UF = require('../modules/user'),
    Auth = require('../passport/auth');

/** Rutas de la interfaz web relativas a usuarios */
module.exports = (passport) => {
    router.get('/profile', Auth.isProfileAuthenticated, UF.profile);
    router.post('/addSubscriber', UF.addSubscriber);
    router.post('/sendNews',UF.sendNews);
    return router;
};