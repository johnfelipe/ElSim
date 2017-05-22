

const express = require('express'),
    router = express.Router(),
    Response = require('../modules/response'),
    response = Response.response,
    apiResponse = Response.apiResponse,
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
        console.info('GET '.green + ' /add-data');
        response(req, res, 'pages/data/add-data', 'Add data', {
            err: null,
            codigos: codigos
        });
    });

    router.get('/stored-data', (req, res) => {
        console.info('GET '.green + ' /stored-data');
        Results.find()
            .then((data) => {
                console.info('Results found: '.green + data.length);
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
        console.info('GET '.green + ' /resultados/' + req.params.id);

        Results.findOne(req.params.id)
            .then((data) => {
                apiResponse(req, res, null, 'Result', data);
            })
            .catch((err) => {
                apiResponse(req, res, err, 'Result', null);
            });
    });

    router.get('/delete-data', isAuthenticated, (req, res) => {
        console.info('GET '.green + ' /delete-data');
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
        console.info('POST '.green + ' /add-data');
        console.warn(req.params);

        let args = [
            req.params.votes,
            req.params.province,
            parseInt(req.params.population),
            parseInt(req.params.census),
            parseInt(req.params.voters),
            parseInt(req.params.nulos),
            parseInt(req.params.blancos),
            req.params.author,
            req.params.date
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
        console.info('POST '.green + ' /add-data-file');
        response(req, res, 'pages/misc/error', 'Not Implemented', {
            err: {
                status: 500
            },
            message: 'Not implemented'
        });
    });

    router.post('/delete-data', (req, res) => {
        console.info('POST '.green + ' /delete-data');
        console.warn(req.params);

        let promises = [],
            results = req.params.Results;

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