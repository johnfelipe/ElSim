const express = require('express');
const router = express.Router();
const response = require('../../modules/response').response;
const Chart = require('../../charts/chart');
const Results = require('../../services/results');
const console = require('better-console');
const Util = require('../../utilities/util');
const moment = require('moment');
const sendError = require('../error').sendError;

{

    router.get('/single-graphic-form', (req, res) => {
        console.info('GET '.yellow + '/single-graphic-form');

        Results.find()
            .then((data) => {
                data.sort(Util.sortByDate);
                response(req, res, 'pages/simulator/single-graphic-form', 'Single Chart', {
                    results: data,
                    moment,
                    err: null
                });
            })
            .catch((err) => sendError(req, res, err));
    });

    router.post('/graphic-form', (req, res) => {

        console.info('POST '.yellow + '/graphic-form');

        if ([
                req.body.mode,
                req.body.mandates,
                req.body.percentage,
                req.body.resultSelected
            ].includes(undefined)) {
            sendError(req, res, 'Parameters error');
            return;
        }

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

        console.info('POST '.yellow + '/save-single-chart');

        res.send({
            result: req.body.result
        });
    });

    /** Handle all web routes */
    module.exports = router;
}