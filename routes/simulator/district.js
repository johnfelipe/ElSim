/* jshint esversion: 6 */
'use strict';
const express = require('express'),
    router = express.Router(),
    response = require('../../modules/response').response,
    Chart = require('../../charts/chart'),
    Results = require('../../services/results'),
    console = require('better-console'),
    Util = require('../../utilities/util'),
    Moment = require('moment');

{
    router.get('/single-graphic-form', (req, res) => {

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
                response(req, res, 'pages/simulator/single-graphic-form', 'Single Chart', {
                    results: null,
                    moment: Moment,
                    err: err
                });
            });
    });

    router.post('/graphic-form', (req, res) => {

        let mode = req.body.mode,
            mandates = req.body.mandates,
            percentage = req.body.percentage,
            resultSelected = req.body.resultSelected,
            user = req.user;

        Chart.calculateDistrict(mode, mandates, percentage, resultSelected, user)
            .then((options)=> {
                res.render('pages/simulator/single-chart', options);
            })
            .catch((err)=> {
                res.render('pages/simulator/single-chart', {err:err});
            });
    });

    router.post('/save-single-chart', (req, res) => {
        res.send({
                result: req.body.result
            });
        }
    );

    /** Handle all web routes */
    module.exports = router;
}