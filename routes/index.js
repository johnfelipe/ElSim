/* jshint esversion: 6 */
'use strict';
const express = require('express'),
    router = express.Router(),
    IGF = require('../modules/functions/index-get-functions'),
    IPF = require('../modules/functions/index-post-functions'),
    Api = require('../modules/functions/api-functions'),
    Admin = require('../modules/functions/admin-functions'),
    Auth = require('../passport/auth');

/**
 * Handle all web routes
 * @module routes/index
 */
module.exports = (passport) => {

    /** GET routes */
    router.get('/', IGF.indexGetFunction);
    router.get('/help', IGF.helpGetFunction);
    router.get('/single-graphic-form',Auth.isAuthenticated, IGF.singleGraphicFormGetFunction);
    router.get('/country-graphic-form', Auth.isAuthenticated, IGF.countryGraphicFormGetFunction);
    router.get('/learn', IGF.learnGetFunction);
    router.get('/resources', IGF.resourcesGetFunction);
    router.get('/add-data',Auth.isAuthenticated, IGF.addDataGetFunction);
    router.get('/stored-data', IGF.storedDataFunction);
    router.get('/quiz', IGF.learnGetFunction);
    router.get('/minigame', IGF.learnGetFunction);
    router.get('/login', IGF.loginGetFunction);
    router.get('/signup', IGF.signUpGetFunction);
    router.get('/signout',Auth.isAuthenticated, IGF.signOutGetFunction);
    router.get('/parties', IGF.partiesFunction);
    router.get('/resultados/:id', Api.findOneResultado);
    router.get('/delete-data',Auth.isAuthenticated, IGF.deleteDataGetFunction);
    router.get('/admin',Auth.isAuthenticated, Admin.adminSummaryFunction);

    /** POST routes */
    router.post('/add-data', Auth.isAuthenticated,IPF.addDataPostFunction);
    router.post('/add-data-file', Auth.isAuthenticated, IPF.addDataFilePostFunction);
    router.post('/delete-data', Auth.isAuthenticated, IPF.deleteDataPostFunction);
    router.post('/graphic-form', Auth.isAuthenticated, IPF.graphicFormPostFunction);
    router.post('/country-form', Auth.isAuthenticated, IPF.countryFormPostFunction);
    router.post('/save-single-chart', Auth.isAuthenticated, IPF.saveResultFunction);

    router.post('/login', passport.authenticate('login', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash : true
    }));
    router.post('/signup', passport.authenticate('signup', {
        successRedirect: '/',
        failureRedirect: '/signup',
        failureFlash : true
    }));

    return router;
};

