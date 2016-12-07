'use strict';
const express = require('express'),
    router = express.Router(),
    IndexFunctions = require('./../modules/functions/index-functions'),
    api = require('./../modules/functions/api-functions');

const isAuthenticated = function (req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/');
};

module.exports = function(passport){
    /**
     * All the index routes
     * @see modules/functions/index-functions.js
     * @module routes/index
     */
    router.get('/', IndexFunctions.indexGetFunction);
    router.get('/help', isAuthenticated, IndexFunctions.helpGetFunction);
    router.get('/leaflet-example', IndexFunctions.leafletExampleGetFunction);
    router.get('/graphic-form', IndexFunctions.graphicFormGetFunction);
    router.get('/learn', IndexFunctions.learnGetFunction);
    router.get('/add-data', IndexFunctions.addDataGetFunction);
    router.get('/stored-data', IndexFunctions.storedDataFunction);

    router.get('/parties', IndexFunctions.partiesFunction);
    router.get('/resultados/:id', api.findOneResultado);
    router.post('/add-data', IndexFunctions.addDataPostFunction);
    router.get('/delete-data', IndexFunctions.deleteDataGetFunction);
    router.post('/delete-data', IndexFunctions.deleteDataPostFunction);
    router.post('/graphic-form', IndexFunctions.graphicFormPostFunction);

    /* Handle Login POST */
    router.post('/login', passport.authenticate('login', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash : true
    }));

    /* GET Registration Page */
    router.get('/login', function(req, res){
        res.render('pages/login',{
            message: req.flash('message'),
            title: 'Login Page',
            user: req.user
        });
    });

    /* GET Registration Page */
    router.get('/signup', function(req, res){
        res.render('pages/register',{
            message: req.flash('message'),
            title: 'Register Page',
            user: req.user
        });
    });

    /* Handle Registration POST */
    router.post('/signup', passport.authenticate('signup', {
        successRedirect: '/',
        failureRedirect: '/signup',
        failureFlash : true
    }));

    /* Handle Logout */
    router.get('/signout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    return router;
};

