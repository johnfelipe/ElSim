'use strict';
const express = require('express'),
    router = express.Router(),
    IndexFunctions = require('./../modules/functions/index-functions'),
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
    router.get('/', IndexFunctions.indexGetFunction);
    router.get('/help', IndexFunctions.helpGetFunction);
    router.get('/leaflet-example', IndexFunctions.leafletExampleGetFunction);
    router.get('/graphic-form', isAuthenticated,IndexFunctions.graphicFormGetFunction);
    router.get('/learn', IndexFunctions.learnGetFunction);
    router.get('/add-data', isAuthenticated,IndexFunctions.addDataGetFunction);
    router.get('/stored-data', isAuthenticated,IndexFunctions.storedDataFunction);
    router.get('/login', IndexFunctions.loginGetFunction);
    router.get('/signup', IndexFunctions.signUpGetFunction);
    router.get('/signout', IndexFunctions.signOutGetFunction);
    router.get('/parties', IndexFunctions.partiesFunction);
    router.get('/resultados/:id', api.findOneResultado);
    router.get('/delete-data', isAuthenticated,IndexFunctions.deleteDataGetFunction);

    /** POST routes */
    router.post('/add-data', IndexFunctions.addDataPostFunction);
    router.post('/delete-data', IndexFunctions.deleteDataPostFunction);
    router.post('/graphic-form', IndexFunctions.graphicFormPostFunction);
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

