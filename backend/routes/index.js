'use strict';
const express = require('express'),
    router = express.Router(),
    IndexGetFunctions = require('../modules/functions/index-get-functions'),
    IndexPostFunctions = require('../modules/functions/index-post-functions'),
    api = require('../modules/functions/api-functions');

const isAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.render('pages/index',{
        title: 'Welcome Page',
        user: req.user,
        advice: 'Sorry, but you must to login to use the simulator or manage data.'
    });
};

/**
 * Handle all web routes
 * @module routes/index
 */
module.exports = function(passport){
    /** GET routes */
    router.get('/', IndexGetFunctions.indexGetFunction);
    router.get('/help', IndexGetFunctions.helpGetFunction);
    router.get('/leaflet-example', IndexGetFunctions.leafletExampleGetFunction);
    router.get('/graphic-form', isAuthenticated, IndexGetFunctions.graphicFormGetFunction);
    router.get('/learn', IndexGetFunctions.learnGetFunction);
    router.get('/laws', IndexGetFunctions.lawsGetFunction);
    router.get('/add-data', isAuthenticated, IndexGetFunctions.addDataGetFunction);
    router.get('/stored-data', isAuthenticated, IndexGetFunctions.storedDataFunction);
    router.get('/login', IndexGetFunctions.loginGetFunction);
    router.get('/signup', IndexGetFunctions.signUpGetFunction);
    router.get('/signout', IndexGetFunctions.signOutGetFunction);
    router.get('/parties', IndexGetFunctions.partiesFunction);
    router.get('/resultados/:id', api.findOneResultado);
    router.get('/delete-data', isAuthenticated, IndexGetFunctions.deleteDataGetFunction);

    /** POST routes */
    router.post('/add-data', IndexPostFunctions.addDataPostFunction);
    router.post('/delete-data', IndexPostFunctions.deleteDataPostFunction);
    router.post('/graphic-form', IndexPostFunctions.graphicFormPostFunction);
    router.post('/country-form', IndexPostFunctions.countryFormPostFunction);
    router.post('/save-single-chart', IndexPostFunctions.saveResultFunction);

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

