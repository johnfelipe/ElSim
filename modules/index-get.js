/* jshint esversion: 6 */
'use strict';
const Util = require('../utilities/util'),
    Moment = require('moment'),
    codigos = require('../misc/codigos'),
    parties = require('../misc/parties'),
    Results = require('../services/results'),
    Questions = require('../services/quiz');
/**
 *
 * @module index-get-functions
 */
{
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
        Results.find((err, data) => {
            data.sort(Util.sortByDate);
            indexResponse(req, res, 'pages/simulator/single-graphic-form', 'Single Chart', {
                results: data,
                moment: Moment,
                err: err
            });
        });
    };

    const countryGraphicFormGetFunction = (req, res) => {
        Util.calculateEllections((data, ellections) => {
            ellections.sort(Util.sortByDate);
            indexResponse(req, res, 'pages/simulator/country-graphic-form', 'Country Chart', {
                results: data,
                ellections: ellections,
                moment: Moment,
                err: null
            });
        });
    };

    const compareCountryGraphicFormGetFunction = (req, res) => {
        Util.calculateEllections((data, ellections) => {
            ellections.sort(Util.sortByDate);
            indexResponse(req, res, 'pages/simulator/compare-country-graphic-form', 'Compare Country Chart', {
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
        Results.find((err, data) => {
            data.sort(Util.sortByDate);

            indexResponse(req, res, 'pages/data/stored-data', 'Stored Data', {
                data: data,
                moment: Moment,
                err: err
            });
        });

    };

    const addDataGetFunction = (req, res) => indexResponse(
        req, res, 'pages/data/add-data', 'Add data', {
            err: null,
            codigos: codigos
        }
    );


    const deleteDataGetFunction = (req, res) => {
        Results.find((err, data) => {
            data.sort(Util.sortByDate);
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

    const quizGetFunction = (req, res) => {
        Questions.find((err, questions) => {
            let max = questions.length;
            let index = parseInt(Math.random() * max);
            indexResponse(req, res, 'pages/more/quiz', 'Quiz', {question: questions[index]});
        });

    };

    module.exports = {

        indexResponse,

        indexGetFunction,

        loginGetFunction,

        signUpGetFunction,

        signOutGetFunction,

        helpGetFunction,

        singleGraphicFormGetFunction,

        countryGraphicFormGetFunction,

        compareCountryGraphicFormGetFunction,

        learnGetFunction,

        resourcesGetFunction,

        storedDataFunction,

        addDataGetFunction,

        deleteDataGetFunction,

        partiesFunction,

        quizGetFunction
    };
}

