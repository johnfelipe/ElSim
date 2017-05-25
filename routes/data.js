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
            codigos: codigos,
            moment: Moment
        });
    });

    router.get('/stored-data', (req, res) => {
        console.info('GET '.green + ' /stored-data');
        Results.find()
            .then((data) => {
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

        let province = 'Not found';
        let comunidad = 'Not found';
        let cod_province = 0;
        let keys = Object.keys(Codigos);

        for(let key of keys){
            let subKeys = Object.keys(Codigos[key]);
            for(let subKey of subKeys){
                if(Codigos[key][subKey] === parseInt(req.body.province)){
                    province = subKey.toLowerCase();
                    cod_province = Codigos[key][subKey];
                    comunidad = key;
                }
            }
        }

        let result = {
            votes: req.body.votes,
            province: province,
            cod_province: cod_province,
            comunidad: comunidad,
            population: parseInt(req.body.population),
            census: parseInt(req.body.census),
            voters: parseInt(req.body.voters),
            nulos: parseInt(req.body.nulos),
            blancos: parseInt(req.body.blancos),
            author: req.body.author,
            date: req.body.date
        };

        let resultEntity = District.createResultEntity(result);

        resultEntity.save()
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


    router.post('/delete-data', (req, res) => {
        console.info('POST '.green + ' /delete-data');

        let promises = [],
            results = req.body.results;

        if(results instanceof Array) {
            console.info('Es un array: ' + results);
            for (let result of results) {
                promises.push(Results.removeOne(result));
            }
        } else{
            console.info('Es una string: ' + results);
            promises.push(Results.removeOne(results));
        }

        const promisesFinish = () => {
            Results.find()
                .then((data) => {

                    response(req, res, 'pages/data/delete-data', 'Delete data', {
                        err: null,
                        moment: Moment,
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