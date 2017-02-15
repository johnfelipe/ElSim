/* jshint esversion: 6 */
'use strict';
const Result = require('../../models/result'),
    Util = require('../util-module'),
    Moment = require('moment'),
    codigos = require('./misc/codigos');

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
        indexResponse(req, res, 'pages/index', 'EllSim', {moment: Moment, err: null});
    }

    function loginGetFunction(req, res) {
        indexResponse(req, res, 'pages/auth/login', 'Login Page', {message: req.flash('message')});
    }

    function signUpGetFunction(req, res) {
        indexResponse(req, res, 'pages/auth/register', 'Register', {message: req.flash('message')});
    }

    function signOutGetFunction(req, res) {
        req.logout();
        res.redirect('/');
    }

    const helpGetFunction = (req, res) => {
        indexResponse(req, res, 'pages/misc/help', 'Help', false);
    }

    function singleGraphicFormGetFunction(req, res) {
        Result.find({},  (err, data) => {
            data.sort((a,b) => {
                return new Date(a.eleccion.fecha) - new Date(b.eleccion.fecha);
            });
            indexResponse(req, res, 'pages/simulator/single-graphic-form', 'Single Chart', {
                results: data,
                moment: Moment,
                err: err
            });
        });
    }
    function countryGraphicFormGetFunction(req, res) {
        Util.calculateEllections((data, ellections) => {
            ellections.sort((a,b) => {
                return new Date(a.fecha) - new Date(b.fecha);
            });
            indexResponse(req, res, 'pages/simulator/country-graphic-form', 'Country Chart', {
                results: data,
                ellections: ellections,
                moment: Moment,
                err: null
            });
        });
    }

    function learnGetFunction(req, res) {
        indexResponse(req, res, 'pages/more/learn', 'Learn', false);
    }

    function resourcesGetFunction(req, res) {
        indexResponse(req, res, 'pages/more/resources', 'Resources', false);
    }

    function storedDataFunction(req, res) {
        Result.find({}, haveResult);
        function haveResult(err, data) {
            data.sort((a,b) => {
                return new Date(a.eleccion.fecha) - new Date(b.eleccion.fecha);
            });
            indexResponse(req, res, 'pages/data/stored-data', 'Stored Data', {
                data: data,
                moment: Moment,
                err: err
            });
        }
    }

    function addDataGetFunction(req, res) {
        indexResponse(req, res, 'pages/data/add-data', 'Add data', {
            err: null,
            codigos: codigos
        });
    }

    function deleteDataGetFunction(req, res) {
        Result.find({}, (err, data) => {
            indexResponse(req, res, 'pages/data/delete-data', 'Delete data', {
                data: data,
                moment: Moment,
                err: null
            });
        });

    }

    function partiesFunction(req, res) {
        let parties = require('./misc/parties');
        indexResponse(req, res, 'pages/more/parties', 'Parties', {
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

