const express = require('express');
const router = express.Router();
const response = require('../../modules/response').response;
const Chart = require('../../charts/chart');
const Colors = require('../../misc/colors');
const Icons = require('../../misc/icons');
const Util = require('../../utilities/util');
const moment = require('moment');
const sendError = require('../error').sendError;
const console = require('better-console');
const colors = require('colors');

{
    router.get('/country-graphic-form', (req, res) => {

        console.info('GET '.yellow + '/country-graphic-form');

        Util.calculateElections()
            .then((result) => {
                result.elections.sort(Util.sortByDate);

                response(req, res, 'pages/simulator/country-graphic-form', 'Country Chart', {
                    results: result.data,
                    elections: result.elections,
                    moment,
                    err: null
                });
            })
            .catch((err) => sendError(req, res, err));
    });

    router.post('/country-form', (req, res) => {

        console.info('POST '.yellow + '/country-form');

        if (typeof req.body.resultSelected === 'undefined' ||
            typeof req.body.percentage === 'undefined') {
            sendError(req, res, 'Parameters error');
            return;
        }

        let resultSelected = req.body.resultSelected,
            percentage = req.body.percentage,
            user = req.user,
            body = req.body;

        Chart.calculateCountry(resultSelected, percentage, user, body)
            .then((options) => {
                options.colors = Colors;
                options.icons = Icons;
                options.user = user;
                res.render('pages/simulator/country-chart', options);
            })
            .catch((err) => sendError(req, res, err));
    });

    module.exports = router;
}