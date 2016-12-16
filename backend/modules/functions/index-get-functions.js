/* jshint esversion: 6 */
'use strict';
const Result = require('../../models/result'),
    Util = require('../util-module'),
    Moment = require('moment');

/**
 * All the callback functions of index GET routes
 * @module functions/index-get-functions
 */
(function () {
    function indexGetFunction(req, res) {
        let options = {
            title: 'EllSim',
            moment: Moment,
            user: req.user,
            advice: null
        };
        res.render('pages/index', options);
    }

    function loginGetFunction(req, res) {
        res.render('pages/login', {
            message: req.flash('message'),
            title: 'Login Page',
            user: req.user
        });
    }

    function signUpGetFunction(req, res) {
        res.render('pages/register', {
            message: req.flash('message'),
            title: 'Register',
            user: req.user
        });
    }

    function signOutGetFunction(req, res) {
        req.logout();
        res.redirect('/');
    }

    function helpGetFunction(req, res) {
        let options = {
            title: 'Help',
            user: req.user
        };
        res.render('pages/help', options);
    }

    function leafletExampleGetFunction(req, res) {
        let options = {
            title: 'LeafletJS example',
            user: req.user
        };
        res.render('pages/leaflet-example', options);
    }

    function graphicFormGetFunction(req, res) {
        Util.calculateEllections(function (data, ellections) {
            let options = {
                title: 'Chart',
                results: data,
                ellections: ellections,
                user: req.user
            };
            res.render('pages/graphic-form', options);
        });
    }

    function learnGetFunction(req, res) {
        let options = {
            title: 'Learn',
            user: req.user
        };
        res.render('pages/learn', options);

    }

    function lawsGetFunction(req, res) {
        let options = {
            title: 'Laws',
            user: req.user
        };
        res.render('pages/laws', options);
    }

    function storedDataFunction(req, res) {

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
    }

    function addDataGetFunction(req, res) {
        let options = {
            title: 'Add data',
            error: 'NO',
            codigos: require('./../../codigos'),
            user: req.user
        };
        res.render('pages/add-data', options);
    }

    function deleteDataGetFunction(req, res) {
        Result.find({}, function (err, data) {
            let options = {
                title: 'Delete data',
                error: 'NO',
                data: data,
                user: req.user
            };
            res.render('pages/delete-data', options);
        });

    }

    function partiesFunction(req, res) {
        let parties = require('./parties');
        let options = {
            title: 'Parties',
            user: req.user,
            parties: parties
        };
        res.render('pages/parties', options);
    }

    module.exports = {
        /**
         * @description
         * @function
         */
        indexGetFunction: indexGetFunction,

        /**
         * @description
         * @function
         */
        loginGetFunction: loginGetFunction,

        /**
         * @description
         * @function
         */
        signUpGetFunction: signUpGetFunction,

        /**
         * @description
         * @function
         */
        signOutGetFunction: signOutGetFunction,

        /**
         * @description
         * @function
         */
        helpGetFunction: helpGetFunction,

        /**
         * @description
         * @function
         */
        leafletExampleGetFunction: leafletExampleGetFunction,

        /**
         * @description
         * @function
         */
        graphicFormGetFunction: graphicFormGetFunction,

        /**
         * @description
         * @function
         */
        learnGetFunction: learnGetFunction,

        /**
         * @description
         * @function
         */
        lawsGetFunction: lawsGetFunction,

        /**
         * @description
         * @function
         */
        storedDataFunction: storedDataFunction,

        /**
         * @description
         * @function
         */
        addDataGetFunction: addDataGetFunction,

        /**
         * @description
         * @function
         */
        deleteDataGetFunction: deleteDataGetFunction,

        /**
         * @description
         * @function
         */
        partiesFunction: partiesFunction
    };
})();

