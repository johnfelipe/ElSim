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
    function indexResponse(req, res, page, title, other) {
        let options = {
            title: title,
            user: req.user
        };
        let merged;
        if (other) {
            merged = Object.assign(options, other);
        } else {
            merged = options;
        }
        res.render(page, merged);

    }

    function indexGetFunction(req, res) {
        indexResponse(req, res, 'pages/index', 'EllSim', {moment: Moment, advice: null});
    }

    function loginGetFunction(req, res) {
        indexResponse(req, res, 'pages/login', 'Login Page', {message: req.flash('message')});
    }

    function signUpGetFunction(req, res) {
        indexResponse(req, res, 'pages/register', 'Register', {message: req.flash('message')});
    }

    function signOutGetFunction(req, res) {
        req.logout();
        res.redirect('/');
    }

    function helpGetFunction(req, res) {
        indexResponse(req, res, 'pages/help', 'Help', false);
    }

    function leafletExampleGetFunction(req, res) {
        indexResponse(req, res, 'pages/leaflet-example', 'LeafletJS', false);
    }

    function graphicFormGetFunction(req, res) {
        Util.calculateEllections(function (data, ellections) {
            indexResponse(req, res, 'pages/graphic-form', 'Chart', {
                results: data,
                ellections: ellections,
                moment: Moment
            });
        });
    }

    function learnGetFunction(req, res) {
        indexResponse(req, res, 'pages/learn', 'Learn', false);
    }

    function resourcesGetFunction(req, res) {
        indexResponse(req, res, 'pages/resources', 'Resources', false);
    }

    function storedDataFunction(req, res) {

        Result.find({}, haveResult);
        function haveResult(err, data) {
            if (err) throw err;
            indexResponse(req, res, 'pages/stored-data', 'Stored Data', {
                data: data,
                moment: Moment
            });
        }
    }

    function addDataGetFunction(req, res) {
        indexResponse(req, res, 'pages/add-data', 'Add data', {
            error: null,
            codigos: require('../../codigos')
        });
    }

    function deleteDataGetFunction(req, res) {
        Result.find({}, function (err, data) {
            indexResponse(req, res, 'pages/delete-data', 'Delete data', {
                data: data,
                error: null
            });
        });

    }

    function partiesFunction(req, res) {
        let parties = require('./parties');
        indexResponse(req, res, 'pages/parties', 'Parties', {
            parties: parties
        });
    }

    module.exports = {
        /**
         * @description Generic response
         * @function
         */
        indexResponse: indexResponse,

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
        resourcesGetFunction: resourcesGetFunction,

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

