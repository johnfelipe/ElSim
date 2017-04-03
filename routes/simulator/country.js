/* jshint esversion: 6 */
'use strict';
const express = require('express'),
    router = express.Router(),
    response = require('../../modules/response').response,
    Chart = require('../../charts/chart'),
    Colors = require('../../misc/colors'),
    Icons = require('../../misc/icons'),
    console = require('better-console'),
    Util = require('../../utilities/util'),
    Moment = require('moment');
{
    router.get('/country-graphic-form', (req, res) => {
        Util.calculateEllections((data, ellections) => {
            ellections.sort(Util.sortByDate);
            response(req, res, 'pages/simulator/country-graphic-form', 'Country Chart', {
                results: data,
                ellections: ellections,
                moment: Moment,
                err: null
            });
        });
    });

    router.post('/country-form', (req, res) => {
        let resultSelected = req.body.resultSelected,
            percentage = req.body.percentage,
            user = req.user,
            body = req.body;

        Chart.calculateCountry(resultSelected, percentage, user, body, (options) => {
            options.colors = Colors;
            options.icons = Icons;
            options.user = user;
            res.render('pages/simulator/country-chart', options);
        });
    });

    module.exports = router;
}