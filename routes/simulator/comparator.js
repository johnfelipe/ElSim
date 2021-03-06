const express    = require('express');
const router     = express.Router();
const response   = require('../../modules/response').response;
const Util       = require('../../misc/util');
const moment     = require('moment');
const Chart      = require('../../charts/chart');
const Colors     = require('../../misc/colors');
const Icons      = require('../../misc/icons');
const console    = require('better-console');
const Comparator = require('../../modules/comparator');
const sendError  = require('../error').sendError;

{
    router.get('/compare-country-graphic-form', (req, res) => {
        console.info('GET '.yellow + '/compare-country-graphic-form');

        Util.calculateElections()
            .then((result) => {
                result.elections.sort(Util.sortByDate);

                response(req, res, 'pages/simulator/compare-country-graphic-form', 'Compare Country Chart', {
                    results  : result.data,
                    elections: result.elections,
                    moment   : moment,
                    err      : null
                });
            })
            .catch((err) => sendError(req, res, err));

    });

    router.post('/compare-country-form', (req, res) => {

        console.info('GET '.yellow + '/compare-country-form');

        if ([
                req.body.resultSelected,
                req.body.percentage,
                req.body.percentage1
            ].includes(undefined)) {
            sendError(req, res, 'Parameters error');
            return;
        }

        let resultSelected = req.body.resultSelected;
        let percentage1    = req.body.percentage1;
        let percentage2    = req.body.percentage;
        let user           = req.user;

        console.log(percentage1, percentage2)

        let comparator = new Comparator(req.body);

        comparator.fillSets();

        const agrupaGlobal = (conjunto) => {
            let parties     = {};
            let communities = Object.keys(conjunto);
            for (let community of communities) {
                let partiesKeys = Object.keys(conjunto[community].resultadoFinal.parties);
                for (let party of partiesKeys) {
                    if (typeof parties[party] === 'undefined') {
                        parties[party] = conjunto[community].resultadoFinal.parties[party];
                    } else {
                        parties[party] += conjunto[community].resultadoFinal.parties[party];
                    }
                }
            }
            return parties;
        };

        let options1, options2;

        const cleanSet = (set) => {
            let keys = Object.keys(set);
            for (let key of keys) {
                if (set[key] === 0) {
                    delete set[key];
                }
            }
        };

        Chart.calculateCountry(resultSelected, percentage1, user, comparator.set1)
            .then((o) => {
                options1 = o;
                return Chart.calculateCountry(resultSelected, percentage2, user, comparator.set2);
            })
            .then((o) => {
                options2 = o;
                if (typeof comparator.set1.communities !== 'undefined') {
                    options1.global.agrupado = agrupaGlobal(options1.global.agrupado);
                }
                if (typeof comparator.set2.communities !== 'undefined') {
                    options2.global.agrupado = agrupaGlobal(options2.global.agrupado);
                }

                cleanSet(options1.global.agrupado);
                cleanSet(options2.global.agrupado);

                comparator.fillDifferences(
                    options1.global.agrupado,
                    options2.global.agrupado,
                    percentage1,
                    percentage2
                );

                let differences = comparator.differences;

                let options = {
                    options1   : options1,
                    options2   : options2,
                    colors     : Colors,
                    icons      : Icons,
                    user       : user,
                    title      : 'Compare Country',
                    differences: differences
                };

                if (typeof options.differences.results === 'undefined') {
                    options.differences.results = [];
                }

                res.render('pages/simulator/compare-country-chart', options);
            })
            .catch((err) => sendError(req, res, err));
    });

    /** Handle all web routes */
    module.exports = router;
}