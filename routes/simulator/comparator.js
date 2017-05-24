
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
        console.info('GET '.green + '/compare-country-graphic-form');

        Util.calculateEllections()
            .then((result) => {

                result.ellections.sort(Util.sortByDate);

                response(req, res, 'pages/simulator/compare-country-graphic-form', 'Compare Country Chart', {
                    results: result.data,
                    ellections: result.ellections,
                    moment: Moment,
                    err: null
                });
            })
            .catch((err) => {
                sendError(req, res, err);
            });

    });

    router.post('/compare-country-form', (req, res) => {

        console.info('GET '.green + '/compare-country-form');
        console.warn(req.body);

        let resultSelected = req.body.resultSelected,
            percentage1 = req.body.percentage1,
            percentage2 = req.body.percentage,
            user = req.user;

        let comparator = new Comparator(req.body);

        comparator.fillSets();


        const agrupaGlobal = (conjunto) => {
            let parties = {};
            for(let community in conjunto){
                for(let party in conjunto[community].resultadoFinal.parties){
                    if(typeof parties[party] === 'undefined'){
                        parties[party] = conjunto[community].resultadoFinal.parties[party];
                    }else {
                        parties[party] += conjunto[community].resultadoFinal.parties[party];
                    }
                }
            }
            return parties;
        };


        Chart.calculateCountry(resultSelected, percentage1, user, comparator.set1)
            .then((options1) => {
                Chart.calculateCountry(resultSelected, percentage2, user, comparator.set2)
                    .then((options2) => {
                        if(typeof comparator.set1.communities !== 'undefined'){
                            options1.global.agrupado = agrupaGlobal(options1.global.agrupado);
                        }
                        if(typeof comparator.set2.communities !== 'undefined'){
                            options2.global.agrupado = agrupaGlobal(options2.global.agrupado);
                        }

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
                            return sendError(req, res, 'Both results are the same');
                        }


                        res.render('pages/simulator/compare-country-chart', options);
                    })
                    .catch((err) => sendError(req, res, err));
            })
            .catch((err) => sendError(req, res, err));
    });

    /** Handle all web routes */
    module.exports = router;

}