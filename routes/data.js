const express         = require('express');
const router          = express.Router();
const Response        = require('../modules/response');
const response        = Response.response;
const apiResponse     = Response.apiResponse;
const codigos         = require('../misc/codigos');
const Util            = require('../misc/util');
const moment          = require('moment');
const District        = require('../modules/district');
const Results         = require('../services/results');
const Result          = require('../models/result');
const Codigos         = require('../misc/codigos');
const isAuthenticated = require('../passport/auth').isAuthenticated;
const sendError       = require('./error').sendError;

{
    router.get('/add-data', isAuthenticated, (req, res) => {
        console.info('GET '.yellow + ' /add-data');
        response(req, res, 'pages/data/add-data', 'Add data', {
            err: null,
            codigos,
            moment
        });
    });

    router.get('/stored-data', (req, res) => {

        console.info('GET '.yellow + ' /stored-data');

        Results.find()
            .then((data) => {
                data.sort(Util.sortByDate);
                response(req, res, 'pages/data/stored-data', 'Stored Data', {
                    data,
                    moment,
                    err: null
                });
            })
            .catch((err) => sendError(req, res, err));
    });

    router.get('/results/:id', (req, res) => {
        (async () => {
            try {
                console.info('GET '.yellow + ' /results/' + req.params.id);

                let data = await Results.findOne(req.params.id);

                apiResponse(req, res, null, 'Result', data);

            } catch (err) {
                apiResponse(req, res, err, 'Result', null);
            }
        })();
    });

    router.get('/delete-data', isAuthenticated, (req, res) => {
        console.info('GET '.yellow + ' /delete-data');

        Results.find()
            .then((data) => {
                data.sort(Util.sortByDate);
                response(req, res, 'pages/data/delete-data', 'Delete data', {
                    data,
                    moment,
                    err: null
                });
            })
            .catch((err) => sendError(req, res, err));

    });

    router.post('/add-data', (req, res) => {
        console.info('POST '.yellow + ' /add-data');

        if ([
                req.body.votes,
                req.body.population,
                req.body.census,
                req.body.voters,
                req.body.nulls,
                req.body.blanks,
                req.body.author,
                req.body.date
            ].includes(undefined)) {
            sendError(req, res, 'Parameters error');
            return;
        }

        let province     = 'Not found';
        let community    = 'Not found';
        let cod_province = 0;

        let keys = Object.keys(Codigos);

        for (let key of keys) {
            let subKeys = Object.keys(Codigos[key]);
            for (let subKey of subKeys) {
                if (Codigos[key][subKey] === parseInt(req.body.province)) {
                    province     = subKey.toLowerCase();
                    cod_province = Codigos[key][subKey];
                    community    = key;
                }
            }
        }

        let result = {
            votes       : req.body.votes,
            province    : province,
            cod_province: cod_province,
            community   : community,
            population  : parseInt(req.body.population),
            census      : parseInt(req.body.census),
            voters      : parseInt(req.body.voters),
            nulls       : parseInt(req.body.nulls),
            blanks      : parseInt(req.body.blanks),
            author      : req.body.author,
            date        : req.body.date
        };

        let resultEntity = District.createResultEntity(result);

        resultEntity.save()
            .then(() => response(req, res, 'pages/data/add-data', 'Add data', {
                err    : null,
                codigos: Codigos,
                moment
            }))
            .catch((err) => {
                if (err.message.includes('duplicate key')) {
                    response(req, res, 'pages/data/add-data', 'Add data', {
                        err    : 'Result has already been added!',
                        codigos: Codigos,
                        moment
                    });
                    return;
                }
                sendError(req, res, err);
            });
    });

    router.post('/delete-data', (req, res) => {
        console.info('POST '.yellow + ' /delete-data');

        if (typeof req.body.results === 'undefined') {
            sendError(req, res, 'Parameters error');
            return;
        }

        let results = req.body.results;

        (async () => {
            try {
                if (results instanceof Array) {
                    for (let result of results) {
                        await Results.removeOne(result);
                    }
                } else {
                    console.info('Es una string: ' + results);
                    await Results.removeOne(results);
                }

                let data = await Results.find();

                response(req, res, 'pages/data/delete-data', 'Delete data', {
                    err: null,
                    moment,
                    data
                });
            } catch (err) {
                sendError(req, res, err);
            }
        })();
    });

    module.exports = router;
}