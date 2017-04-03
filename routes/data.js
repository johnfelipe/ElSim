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
    checkError = require('../utilities/util').checkError,
    isAuthenticated = require('../passport/auth').isAuthenticated;
{
    router.get('/add-data', isAuthenticated, (req, res) => {
        response(req, res, 'pages/data/add-data', 'Add data', {
            err: null,
            codigos: codigos
        });
    });

    router.get('/stored-data', (req, res) => {
        Results.find((err, data) => {
            data.sort(Util.sortByDate);
            response(req, res, 'pages/data/stored-data', 'Stored Data', {
                data: data,
                moment: Moment,
                err: err
            });
        });

    });

    router.get('/resultados/:id', (req, res) => Results.findOne(req.param('id'),
        (err, data) => Api.apiResponse(req, res, err, 'Result', data)
    ));

    router.get('/delete-data', isAuthenticated, (req, res) => {
        Results.find((err, data) => {
            data.sort(Util.sortByDate);
            response(req, res, 'pages/data/delete-data', 'Delete data', {
                data: data,
                moment: Moment,
                err: null
            });
        });
    });

    router.post('/add-data', (req, res) => {
        let args = [req.param('votes'),
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

        result.save((err) =>
            response(req, res, 'pages/data/add-data', 'Add data', {
                err: err,
                codigos: Codigos
            })
        );
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
            options,
            results = req.param('Results');

        for (let result of results) {
            options = {
                _id: result
            };
            promises.push(Result.remove(options, checkError));
        }

        const promisesFinish = () => Results.find((err, data) => response(
            req, res, 'pages/data/delete-data', 'Delete data', {
                err: err,
                data: data
            }
        ));

        Promise.all(promises).then(promisesFinish);
    });

    module.exports = router;
}