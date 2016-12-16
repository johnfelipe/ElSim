/* jshint esversion: 6 */

const Result = require('../../models/result'),
    Util = require('../util-module');

/**
 * All the callback functions of index GET routes
 * @module modules/functions/index-get-functions
 */
module.exports = {
    indexGetFunction: function (req, res) {
        let options = {
            title: 'EllSim',
            moment: require('moment'),
            user: req.user,
            advice: null
        };
        res.render('pages/index', options);
    },

    loginGetFunction: function (req, res) {
        res.render('pages/login', {
            message: req.flash('message'),
            title: 'Login Page',
            user: req.user
        });
    },

    signUpGetFunction: function (req, res) {
        res.render('pages/register', {
            message: req.flash('message'),
            title: 'Register',
            user: req.user
        });
    },

    signOutGetFunction: function (req, res) {
        req.logout();
        res.redirect('/');
    },

    helpGetFunction: function (req, res) {
        let options = {
            title: 'Help',
            user: req.user
        };
        res.render('pages/help', options);
    },

    leafletExampleGetFunction: function (req, res) {
        let options = {
            title: 'LeafletJS example',
            user: req.user
        };
        res.render('pages/leaflet-example', options);
    },

    graphicFormGetFunction: function (req, res) {
        Util.calculateEllections(function (data, ellections) {
            let options = {
                title: 'Chart',
                results: data,
                ellections: ellections,
                user: req.user
            };
            res.render('pages/graphic-form', options);
        });
    },
    learnGetFunction: function (req, res) {
        let options = {
            title: 'Learn',
            user: req.user
        };
        res.render('pages/learn', options);

    },
    lawsGetFunction: function (req, res) {
        let options = {
            title: 'Laws',
            user: req.user
        };
        res.render('pages/laws', options);
    },

    storedDataFunction: function (req, res) {

        Result.find({}, haveResult);
        function haveResult(err, data) {
            if (err) throw err;
            let options = {
                title: 'Learn',
                data: data,
                user: req.user
            };
            res.render('pages/stored-data', options);
        }
    },

    addDataGetFunction: function (req, res) {
        let options = {
            title: 'Add data',
            error: 'NO',
            codigos: require('./../../codigos'),
            user: req.user
        };
        res.render('pages/add-data', options);
    },
    deleteDataGetFunction: function (req, res) {
        Result.find({}, function (err, data) {
            let options = {
                title: 'Delete data',
                error: 'NO',
                data: data,
                user: req.user
            };
            res.render('pages/delete-data', options);
        });

    },
    partiesFunction: function (req, res) {
        let parties = require('./parties');
        let options = {
            title: 'Parties',
            user: req.user,
            parties: parties
        };
        res.render('pages/parties', options);
    }
};

