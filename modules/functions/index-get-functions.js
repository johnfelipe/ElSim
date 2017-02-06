/* jshint esversion: 6 */
'use strict';
const Result = require('../../models/result'),
    Util = require('../util-module'),
    Moment = require('moment'),
    langEn = require('../lang/lang-en'),
    langEs = require('../lang/lang-es');

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
        indexResponse(req, res, 'pages/index', 'EllSim', {moment: Moment, text: langEn ,err: null});
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

    function singleGraphicFormGetFunction(req, res) {
        Util.calculateEllections(function (data, ellections) {
            indexResponse(req, res, 'pages/simulator/single-graphic-form', 'Single Chart', {
                results: data,
                ellections: ellections,
                moment: Moment,
                err: null
            });
        });
    }
    function countryGraphicFormGetFunction(req, res) {
        Util.calculateEllections(function (data, ellections) {
            indexResponse(req, res, 'pages/simulator/country-graphic-form', 'Country Chart', {
                results: data,
                ellections: ellections,
                moment: Moment,
                err: null
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
            indexResponse(req, res, 'pages/stored-data', 'Stored Data', {
                data: data,
                moment: Moment,
                err: err
            });
        }
    }

    function addDataGetFunction(req, res) {
        indexResponse(req, res, 'pages/add-data', 'Add data', {
            err: null,
            codigos: require('../../codigos')
        });
    }

    function deleteDataGetFunction(req, res) {
        Result.find({}, function (err, data) {
            indexResponse(req, res, 'pages/delete-data', 'Delete data', {
                data: data,
                err: null
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

        indexResponse: indexResponse,

        indexGetFunction: indexGetFunction,

        loginGetFunction: loginGetFunction,

        signUpGetFunction: signUpGetFunction,

        signOutGetFunction: signOutGetFunction,

        helpGetFunction: helpGetFunction,

        singleGraphicFormGetFunction: singleGraphicFormGetFunction,

        countryGraphicFormGetFunction: countryGraphicFormGetFunction,

        learnGetFunction: learnGetFunction,

        resourcesGetFunction: resourcesGetFunction,

        storedDataFunction: storedDataFunction,

        addDataGetFunction: addDataGetFunction,

        deleteDataGetFunction: deleteDataGetFunction,

        partiesFunction: partiesFunction
    };
})();

