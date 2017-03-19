/* jshint esversion: 6 */
'use strict';
const express = require('express'),
    router = express.Router(),
    IGF = require('../modules/index-get'),
    IPF = require('../modules/index-post'),
    Api = require('../modules/api'),
    Admin = require('../modules/admin');

/** Handle all web routes */
module.exports = (passport) => {

    /** GET routes */
    router.get('/', IGF.indexGetFunction);
    router.get('/help', IGF.helpGetFunction);
    router.get('/single-graphic-form',  IGF.singleGraphicFormGetFunction);
    router.get('/country-graphic-form',  IGF.countryGraphicFormGetFunction);
    router.get('/compare-country-graphic-form',  IGF.compareCountryGraphicFormGetFunction);
    router.get('/learn', IGF.learnGetFunction);
    router.get('/resources', IGF.resourcesGetFunction);
    router.get('/add-data',  IGF.addDataGetFunction);
    router.get('/stored-data', IGF.storedDataFunction);
    router.get('/quiz', IGF.quizGetFunction);
    router.get('/minigame', IGF.learnGetFunction);
    router.get('/login', IGF.loginGetFunction);
    router.get('/signup', IGF.signUpGetFunction);
    router.get('/signout',  IGF.signOutGetFunction);
    router.get('/parties', IGF.partiesFunction);
    router.get('/resultados/:id', Api.findOneResultado);
    router.get('/delete-data',  IGF.deleteDataGetFunction);
    router.get('/admin',  Admin.adminSummaryFunction);

    /** POST routes */
    router.post('/add-data', IPF.addDataPostFunction);
    router.post('/add-data-file',  IPF.addDataFilePostFunction);
    router.post('/delete-data',  IPF.deleteDataPostFunction);
    router.post('/graphic-form',  IPF.graphicFormPostFunction);
    router.post('/country-form',  IPF.countryFormPostFunction);
    router.post('/save-single-chart',  IPF.saveResultFunction);

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

