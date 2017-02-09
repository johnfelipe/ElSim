/* jshint esversion: 6 */
const Graphic = require('../graphics/graphic-module'),
    Result = require('../../models/result'),
    Colors = require('../graphics/misc/colors'),
    Icons = require('../graphics/misc/icons'),
    Codigos = require('misc/codigos'),
    District = require('../district-module');

/**
 * All the callback functions of index POST routes
 * @module functions/index-post-functions
 */
(function () {
    function indexResponse(req, res, page, title, other) {
        let options = {
            title: title,
            user: req.user
        };
        let merged;
        if (other) {
            merged = Object.assign(options, other);
        } else {
            merged = options;
        }
        res.render(page, merged);

    }

    function addDataFilePostFunction(req, res) {
        indexResponse(req, res, 'pages/misc/error', 'Not Implemented', {
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
            indexResponse(req, res, 'pages/data/add-data', 'Add data', {
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
            indexResponse(req, res, 'pages/data/delete-data', 'Delete data', {
                err: err,
                data: data
            });
        }

    }

    function graphicFormPostFunction(req, res) {
        Graphic.calculateDistrict(req, function (options) {
            res.render('pages/simulator/single-chart', options);
        });
    }

    function countryFormPostFunction(req, res) {
        Graphic.calculateCountry(req, function (options) {
            options['colors'] = Colors;
            options['icons'] = Icons;
            res.render('pages/simulator/country-chart', options);
        });
    }

    function saveResultFunction(req, res) {
        res.send({result: req.body.result});
    }

    module.exports = {
        /** Generic response */
        indexResponse: indexResponse,

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

