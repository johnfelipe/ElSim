/* jshint esversion: 6 */
'use strict';
const Result = require('../../models/result'),
    Util = require('../util-module'),
    Moment = require('moment'),
    codigos = require('./misc/codigos'),
    parties = require('./misc/parties');

/** All the callback functions of index GET routes */
(function () {
    const indexResponse = (req, res, page, title, other) => {
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
    };

    const indexGetFunction = (req, res) => indexResponse(
        req, res, 'pages/index', 'EllSim', {moment: Moment, err: null}
    );

    const loginGetFunction = (req, res) => indexResponse(
        req, res, 'pages/auth/login', 'Login Page', {message: req.flash('message')}
    );

    const signUpGetFunction = (req, res) => indexResponse(
        req, res, 'pages/auth/register', 'Register', {message: req.flash('message')}
    );

    const signOutGetFunction = (req, res) => {
        req.logout();
        res.redirect('/');
    };

    const helpGetFunction = (req, res) => indexResponse(
        req, res, 'pages/misc/help', 'Help', false
    );


    const singleGraphicFormGetFunction = (req, res) => {
        Result.find({}, (err, data) => {
            data.sort((a, b) => {
                return new Date(a.eleccion.fecha) - new Date(b.eleccion.fecha);
            });

            indexResponse(req, res, 'pages/simulator/single-graphic-form', 'Single Chart', {
                results: data,
                moment: Moment,
                err: err
            });
        });
    };

    const countryGraphicFormGetFunction = (req, res) => {
        Util.calculateEllections((data, ellections) => {
            ellections.sort((a, b) => {
                return new Date(a.fecha) - new Date(b.fecha);
            });
            indexResponse(req, res, 'pages/simulator/country-graphic-form', 'Country Chart', {
                results: data,
                ellections: ellections,
                moment: Moment,
                err: null
            });
        });
    };

    const learnGetFunction = (req, res) => indexResponse(
        req, res, 'pages/more/learn', 'Learn', false
    );

    const resourcesGetFunction = (req, res) => indexResponse(
        req, res, 'pages/more/resources', 'Resources', false
    );


    const storedDataFunction = (req, res) => {
        const haveResult = (err, data) => {
            data.sort((a, b) => {
                return new Date(a.eleccion.fecha) - new Date(b.eleccion.fecha);
            });

            indexResponse(req, res, 'pages/data/stored-data', 'Stored Data', {
                data: data,
                moment: Moment,
                err: err
            });
        };

        Result.find({}, haveResult);
    };

    const addDataGetFunction = (req, res) => indexResponse(
        req, res, 'pages/data/add-data', 'Add data', {
            err: null,
            codigos: codigos
        }
    );


    const deleteDataGetFunction = (req, res) => {
        Result.find({}, (err, data) => {
            data.sort((a, b) => {
                return new Date(a.eleccion.fecha) - new Date(b.eleccion.fecha);
            });
            indexResponse(req, res, 'pages/data/delete-data', 'Delete data', {
                data: data,
                moment: Moment,
                err: null
            });
        });
    };

    const partiesFunction = (req, res) => {
        indexResponse(req, res, 'pages/more/parties', 'Parties', {
            parties: parties
        });
    };

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

