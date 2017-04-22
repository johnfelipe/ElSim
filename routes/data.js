/* jshint esversion: 6 */
'use strict';
const express = require('express'),
    router = express.Router(),
    response = require('../modules/response').response,
    Api = require('../modules/api'),
    codigos = require('../misc/codigos'),
    Util = require('../utilities/util'),
    Moment = require('moment'),
    District = require('../modules/district'),
    Results = require('../services/results'),
    Result = require('../models/result'),
    Codigos = require('../misc/codigos'),
    isAuthenticated = require('../passport/auth').isAuthenticated,
    Q = require('q'),
    sendError = require('./error').sendError;

{
    router.get('/add-data', isAuthenticated, (req, res) => {
        response(req, res, 'pages/data/add-data', 'Add data', {
            err: null,
            codigos: codigos
        });
    });

    router.get('/stored-data', (req, res) => {
        console.warn('Getting data...');
        Results.find()
            .then((data) => {
                console.warn('Results found: '.blue + data.length);
                data.sort(Util.sortByDate);
                response(req, res, 'pages/data/stored-data', 'Stored Data', {
                    data: data,
                    moment: Moment,
                    err: null
                });
            })
            .catch((err) => {
                sendError(req, res, err);
            });
    });

    router.get('/resultados/:id', (req, res) => {
        Results.findOne(req.param('id'))
            .then((data) => {
                Api.apiResponse(req, res, null, 'Result', data);
            })
            .catch((err) => {
                Api.apiResponse(req, res, err, 'Result', null);
            });
    });

    router.get('/delete-data', isAuthenticated, (req, res) => {
        Results.find()
            .then((data) => {
                data.sort(Util.sortByDate);
                response(req, res, 'pages/data/delete-data', 'Delete data', {
                    data: data,
                    moment: Moment,
                    err: null
                });
            })
            .catch((err) => {
                sendError(req, res, err);
            });
    });

    router.post('/add-data', (req, res) => {
        let args = [
            req.param('votes'),
            req.param('province'),
            parseInt(req.param('population')),
            parseInt(req.param('census')),
            parseInt(req.param('voters')),
            parseInt(req.param('nulos')),
            parseInt(req.param('blancos')),
            req.param('author'),
            req.param('date')
        ];

        let result = District.createResultEntity(args);

        result.save()
            .then(() => {
                response(req, res, 'pages/data/add-data', 'Add data', {
                    err: null,
                    codigos: Codigos
                });
            })
            .catch((err) => {
                sendError(req, res, err);
            });
    });

    router.post('/add-data-file', (req, res) => {
        response(req, res, 'pages/misc/error', 'Not Implemented', {
            err: {
                status: 500
            },
            message: 'Not implemented'
        });
    });

    router.post('/delete-data', (req, res) => {
        let promises = [],
            results = req.param('Results');

        for (let result of results) {
            promises.push(Result.remove({_id: result}));
        }

        const promisesFinish = () => {
            Results.find()
                .then((data) => {
                    response(req, res, 'pages/data/delete-data', 'Delete data', {
                        err: null,
                        data: data
                    });
                })
                .catch((err) => {
                    sendError(req, res, err);
                });
        };

        Q.all(promises).then(promisesFinish);
    });

    module.exports = router;
}