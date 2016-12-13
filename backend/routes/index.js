'use strict';
const express = require('express'),
    router = express.Router(),
    _ = require('./../modules/functions/index-functions'),
    api = require('./../modules/functions/api-functions');

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
    router.get('/', _.indexGetFunction);
    router.get('/help', _.helpGetFunction);
    router.get('/leaflet-example', _.leafletExampleGetFunction);
    router.get('/graphic-form', isAuthenticated,_.graphicFormGetFunction);
    router.get('/learn', _.learnGetFunction);
    router.get('/laws', _.lawsGetFunction);
    router.get('/add-data', isAuthenticated,_.addDataGetFunction);
    router.get('/stored-data', isAuthenticated,_.storedDataFunction);
    router.get('/login', _.loginGetFunction);
    router.get('/signup', _.signUpGetFunction);
    router.get('/signout', _.signOutGetFunction);
    router.get('/parties', _.partiesFunction);
    router.get('/resultados/:id', api.findOneResultado);
    router.get('/delete-data', isAuthenticated,_.deleteDataGetFunction);

    /** POST routes */
    router.post('/add-data', _.addDataPostFunction);
    router.post('/delete-data', _.deleteDataPostFunction);
    router.post('/graphic-form', _.graphicFormPostFunction);
    router.post('/country-form', _.countryFormPostFunction);
    router.post('/save-single-chart',_.saveResultFunction);

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

