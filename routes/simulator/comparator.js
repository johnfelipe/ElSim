const express = require('express'),
    router = express.Router(),
    response = require('../../modules/response').response,
    Util = require('../../utilities/util'),
    Moment = require('moment'),
    Chart = require('../../charts/chart'),
    Colors = require('../../misc/colors'),
    Icons = require('../../misc/icons'),
    console = require('better-console'),
    Comparator = require('../../modules/comparator'),
    sendError = require('../error').sendError;
{
    router.get('/compare-country-graphic-form', (req, res) => {
        console.info('GET '.yellow + '/compare-country-graphic-form');

        Util.calculateElections()
            .then((result) => {

                result.elections.sort(Util.sortByDate);

                response(req, res, 'pages/simulator/compare-country-graphic-form', 'Compare Country Chart', {
                    results: result.data,
                    elections: result.elections,
                    moment: Moment,
                    err: null
                });
            })
            .catch((err) => sendError(req, res, err));
    });

    router.post('/compare-country-form', (req, res) => {

        console.info('GET '.yellow + '/compare-country-form');

        if (typeof req.body.resultSelected === 'undefined' ||
            typeof req.body.percentage === 'undefined' ||
            typeof req.body.percentage1 === 'undefined') {
            sendError(req, res, 'Parameters error');
            return;
        }

        let resultSelected = req.body.resultSelected,
            percentage1 = req.body.percentage1,
            percentage2 = req.body.percentage,
            user = req.user;

        let comparator = new Comparator(req.body);

        comparator.fillSets();

        const agrupaGlobal = (conjunto) => {
            let parties = {};
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
            for(let key of keys){
                if(set[key] === 0){
                    delete set[key];
                }
            }
        };

        const handleSecondResult = (o) => {
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
                options1: options1,
                options2: options2,
                colors: Colors,
                icons: Icons,
                user: user,
                title: 'Compare Country',
                differences: differences
            };

            if (typeof options.differences.results === 'undefined') {
                options.differences.results = [];
            }

            res.render('pages/simulator/compare-country-chart', options);
        };

        const handleFirstResult = (o) => {
            options1 = o;
            return Chart.calculateCountry(resultSelected, percentage2, user, comparator.set2);
        };

        Chart.calculateCountry(resultSelected, percentage1, user, comparator.set1)
            .then(handleFirstResult)
            .then(handleSecondResult)
            .catch((err) => sendError(req, res, err));
    });

    /** Handle all web routes */
    module.exports = router;

}