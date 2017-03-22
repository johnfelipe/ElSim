/* jshint esversion: 6 */
const Chart = require('../charts/chart'),
    Result = require('../models/result'),
    Colors = require('../misc/colors'),
    Icons = require('../misc/icons'),
    Codigos = require('../misc/codigos'),
    District = require('./district'),
    checkError = require('../utilities/util').checkError,
    Results = require('../services/results'),
    console = require('better-console'),
    comparator = require('./comparator');

let response = require('./index-get').indexResponse;

/**
 *
 * @module index-post-functions
 */
{
    const addDataFilePostFunction = (req, res) => {
        response(req, res, 'pages/misc/error', 'Not Implemented', {
            err: {
                status: 500
            },
            message: 'Not implemented'
        });
    };

    const addDataPostFunction = (req, res) => {
        let args = [req.param('votes'),
            req.param('province'),
            parseInt(req.param('population')),
            parseInt(req.param('census')),
            parseInt(req.param('voters')),
            parseInt(req.param('nulos')),
            parseInt(req.param('blancos')),
            req.param('author'),
            req.param('date')
        ];

        let result = District.createResultEntity(args);

        result.save((err) =>
            response(req, res, 'pages/data/add-data', 'Add data', {
                err: err,
                codigos: Codigos
            })
        );
    };

    const deleteDataPostFunction = (req, res) => {
        let promises = [],
            options,
            results = req.param('Results');

        for (let i = 0, len = results.length; i < len; ++i) {
            options = {
                _id: results[i]
            };
            promises.push(Result.remove(options, checkError));
        }

        const promisesFinish = () => Results.find((err, data) => response(
            req, res, 'pages/data/delete-data', 'Delete data', {
                err: err,
                data: data
            }
        ));

        Promise.all(promises).then(promisesFinish);
    };

    const graphicFormPostFunction = (req, res) => {
        let mode = req.body.mode,
            mandates = req.body.mandates,
            percentage = req.body.percentage,
            resultSelected = req.body.resultSelected,
            user = req.user;

        Chart.calculateDistrict(mode, mandates, percentage, resultSelected, user,
            (options) => res.render('pages/simulator/single-chart', options)
        );
    };

    const countryFormPostFunction = (req, res) => {
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
    };

    const compareCountryFormPostFunction = (req, res) => {
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
                res.render('pages/simulator/compare-country-chart', options);
            });
        });


    };

    const saveResultFunction = (req, res) => res.send({result: req.body.result});


    module.exports = {
        /** Handles add data form */
        addDataPostFunction,

        addDataFilePostFunction,

        /** Handles delete data form */
        deleteDataPostFunction,

        /** Handles single district chart form */
        graphicFormPostFunction,

        /** Handles country chart form */
        countryFormPostFunction,

        /** Handles compare country chart form */
        compareCountryFormPostFunction,

        /** Saves a result */
        saveResultFunction
    };
}

