/* jshint esversion: 6 */
'use strict';
const express = require('express'),
    router = express.Router(),
    response = require('../../modules/response').response,
    Util = require('../../utilities/util'),
    Moment = require('moment'),
    Chart = require('../../charts/chart'),
    Colors = require('../../misc/colors'),
    Icons = require('../../misc/icons'),
    console = require('better-console'),
    comparator = require('../../modules/comparator'),
    resError = require('../../utilities/errorHandler').productionHandler;

router.get('/compare-country-graphic-form', (req, res) => {

    Util.calculateEllections((data, ellections) => {

        ellections.sort(Util.sortByDate);

        response(req, res, 'pages/simulator/compare-country-graphic-form', 'Compare Country Chart', {
            results: data,
            ellections: ellections,
            moment: Moment,
            err: null
        });
    });

});

router.post('/compare-country-form', (req, res) => {
    let resultSelected = req.body.resultSelected,
        percentage1 = req.body.percentage1,
        percentage2 = req.body.percentage,
        user = req.user;

    let conjunto1 = {};
    let conjunto2 = {};

    comparator.fillSets(conjunto1, conjunto2, req.body);

    Chart.calculateCountry(resultSelected, percentage1, user, conjunto1, (options1) => {
        Chart.calculateCountry(resultSelected, percentage2, user, conjunto2, (options2) => {
            let options = {};
            options.options1 = options1;
            options.options2 = options2;
            options.colors = Colors;
            options.icons = Icons;
            options.user = user;
            options.title = 'Compare Country';
            options.differences = comparator.fillDifferences(
                options1.global.agrupado,
                options2.global.agrupado,
                percentage1,
                percentage2,
                conjunto1,
                conjunto2
            );
            if (typeof options.differences.results === 'undefined'){
                response(req, res, 'pages/misc/error', 'Both results are the same', {
                    err: {
                        status: 500
                    },
                    message: 'Both results are the same'
                });
            }
            res.render('pages/simulator/compare-country-chart', options);
        });
    });
});

/** Handle all web routes */
module.exports = router;

