/* jshint esversion: 6 */
const Graphic = require('../graphics/graphic-module'),
    Result = require('../../models/result'),
    Colors = require('../graphics/misc/colors'),
    Icons = require('../graphics/misc/icons'),
    Codigos = require('./misc/codigos'),
    District = require('../district-module');

let response = require('./index-get-functions').response;

/**
 * All the callback functions of index POST routes
 * @module functions/index-post-functions
 */
(function () {
    function addDataFilePostFunction(req, res) {
        response(req, res, 'pages/misc/error', 'Not Implemented', {
            err: {
                status: 500
            },
            message: 'Not implemented'
        });
    }

    function addDataPostFunction(req, res) {
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

        result.save(function (err) {
            response(req, res, 'pages/data/add-data', 'Add data', {
                err: err,
                codigos: Codigos
            });
        });

    }

    function checkError(err) {
        if (err) {
            throw err;
        }
    }

    function deleteDataPostFunction(req, res) {
        let promises = [],
            options,
            results = req.param('results');

        for (let i = 0, len = results.length; i < len; ++i) {
            options = {
                _id: results[i]
            };
            promises.push(Result.remove(options, checkError));
        }

        Promise.all(promises).then(promisesFinish);

        function promisesFinish() {
            Result.find({}, findCallback);
        }

        function findCallback(err, data) {
            response(req, res, 'pages/data/delete-data', 'Delete data', {
                err: err,
                data: data
            });
        }

    }

    function graphicFormPostFunction(req, res) {
        let mode = req.body.mode,
            mandates = req.body.mandates,
            percentage = req.body.percentage,
            resultSelected = req.body.resultSelected,
            user = req.body.user;

        Graphic.calculateDistrict(mode, mandates, percentage, resultSelected, user, districtCalculated);

        function districtCalculated(options) {
            res.render('pages/simulator/single-chart', options);
        }
    }

    function countryFormPostFunction(req, res) {
        let resultSelected = req.body.resultSelected,
            percentage = req.body.percentage,
            user = req.body.user,
            body = req.body;

        Graphic.calculateCountry(resultSelected, percentage, user, body, calculatedCountry);

        function calculatedCountry(options) {

            options.colors = Colors;
            options.icons = Icons;
            console.log(options);
            res.render('pages/simulator/country-chart', options);
        }
    }

    function saveResultFunction(req, res) {
        res.send({result: req.body.result});
    }

    module.exports = {
        /** Generic response */
        response: response,

        /** Simple if statement to check err var */
        checkError: checkError,

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

