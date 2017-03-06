/* jshint esversion: 6 */
const Graphic = require('../graphics/graphic-module'),
    Result = require('../../models/result'),
    Colors = require('../graphics/misc/colors'),
    Icons = require('../graphics/misc/icons'),
    Codigos = require('./misc/codigos'),
    District = require('../district-module'),
    checkError = require('../util-module').checkError;

let response = require('./index-get-functions').indexResponse;

/**
 *
 * @module index-post-functions
 */
(function () {
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
            parseInt(req.param('num_mesas')),
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
            results = req.param('results');

        for (let i = 0, len = results.length; i < len; ++i) {
            options = {
                _id: results[i]
            };
            promises.push(Result.remove(options, checkError));
        }

        const promisesFinish = () => Result.find({}, findCallback);

        Promise.all(promises).then(promisesFinish);

        const findCallback = (err, data) => response(
            req, res, 'pages/data/delete-data', 'Delete data', {
                err: err,
                data: data
            }
        );

    };

    const graphicFormPostFunction = (req, res) => {
        let mode = req.body.mode,
            mandates = req.body.mandates,
            percentage = req.body.percentage,
            resultSelected = req.body.resultSelected,
            user = req.user;

        Graphic.calculateDistrict(mode, mandates, percentage, resultSelected, user,
            (options) => res.render('pages/simulator/single-chart', options)
        );
    };

    const countryFormPostFunction = (req, res) => {
        let resultSelected = req.body.resultSelected,
            percentage = req.body.percentage,
            user = req.user,
            body = req.body;

        const calculatedCountry = (options) => {
            options.colors = Colors;
            options.icons = Icons;
            options.user = user;
            res.render('pages/simulator/country-chart', options);
        };

        Graphic.calculateCountry(resultSelected, percentage, user, body, calculatedCountry);
    };

    const saveResultFunction = (req, res) => res.send({result: req.body.result});


    module.exports = {
        /** Handles add data form */
        addDataPostFunction: addDataPostFunction,

        addDataFilePostFunction: addDataFilePostFunction,

        /** Handles delete data form */
        deleteDataPostFunction: deleteDataPostFunction,

        /** Handles single district chart form */
        graphicFormPostFunction: graphicFormPostFunction,

        /** Handles country chart form */
        countryFormPostFunction: countryFormPostFunction,

        /** Saves a result */
        saveResultFunction: saveResultFunction
    };
})();

