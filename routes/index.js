/* jshint esversion: 6 */
'use strict';
const express = require('express'),
    router = express.Router(),
    IGF = require('../modules/functions/index-get-functions'),
    IPF = require('../modules/functions/index-post-functions'),
    Api = require('../modules/functions/api-functions'),
    Admin = require('../modules/functions/admin-functions');

const isAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.render('pages/index',{
        title: 'Welcome Page',
        user: req.user,
        err: 'Sorry, but you must to login to use the simulator or manage data.'
    });
};

/**
 * Handle all web routes
 * @module routes/index
 */
module.exports = function(passport){

    /** GET routes */
    router.get('/', IGF.indexGetFunction);
    router.get('/help', IGF.helpGetFunction);
    router.get('/single-graphic-form',isAuthenticated, IGF.singleGraphicFormGetFunction);
    router.get('/country-graphic-form', isAuthenticated, IGF.countryGraphicFormGetFunction);
    router.get('/learn', IGF.learnGetFunction);
    router.get('/resources', IGF.resourcesGetFunction);
    router.get('/add-data',isAuthenticated, IGF.addDataGetFunction);
    router.get('/stored-data', IGF.storedDataFunction);
    router.get('/quiz', IGF.learnGetFunction);
    router.get('/minigame', IGF.learnGetFunction);
    router.get('/login', IGF.loginGetFunction);
    router.get('/signup', IGF.signUpGetFunction);
    router.get('/signout',isAuthenticated, IGF.signOutGetFunction);
    router.get('/parties', IGF.partiesFunction);
    router.get('/resultados/:id', Api.findOneResultado);
    router.get('/delete-data',isAuthenticated, IGF.deleteDataGetFunction);
    router.get('/admin',isAuthenticated, Admin.adminSummaryFunction);

    /** POST routes */
    router.post('/add-data', isAuthenticated,IPF.addDataPostFunction);
    router.post('/add-data-file', isAuthenticated, IPF.addDataFilePostFunction);
    router.post('/delete-data', isAuthenticated, IPF.deleteDataPostFunction);
    router.post('/graphic-form', isAuthenticated, IPF.graphicFormPostFunction);
    router.post('/country-form', isAuthenticated, IPF.countryFormPostFunction);
    router.post('/save-single-chart', isAuthenticated, IPF.saveResultFunction);

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

