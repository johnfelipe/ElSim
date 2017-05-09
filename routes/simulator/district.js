/* jshint esversion: 6 */
'use strict';
const express = require('express'),
    router = express.Router(),
    response = require('../../modules/response').response,
    Chart = require('../../charts/chart'),
    Results = require('../../services/results'),
    console = require('better-console'),
    Util = require('../../utilities/util'),
    Moment = require('moment'),
    sendError = require('../error').sendError;

{


    router.get('/single-graphic-form', (req, res) => {
        console.info('GET '.green + '/single-graphic-form');

        Results.find()
            .then((data) => {
                data.sort(Util.sortByDate);
                response(req, res, 'pages/simulator/single-graphic-form', 'Single Chart', {
                    results: data,
                    moment: Moment,
                    err: null
                });
            })
            .catch((err) => {
                sendError(req, res, err);
            });
    });

    router.post('/graphic-form', (req, res) => {

        console.info('POST '.green + '/graphic-form');
        console.warn(req.body);

        let mode = req.body.mode,
            mandates = req.body.mandates,
            percentage = req.body.percentage,
            resultSelected = req.body.resultSelected,
            user = req.user;

        Chart.calculateDistrict(mode, mandates, percentage, resultSelected, user)
            .then((options) => res.render('pages/simulator/single-chart', options))
            .catch((err) => sendError(req, res, err));
    });

    router.post('/save-single-chart', (req, res) => {

        console.info('POST '.green + '/save-single-chart');
        console.warn(req.body);

        res.send({
            result: req.body.result
        });
    });

    /** Handle all web routes */
    module.exports = router;
}