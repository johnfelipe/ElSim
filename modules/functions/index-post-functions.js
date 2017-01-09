/* jshint esversion: 6 */
const Graphic = require('../graphics/graphic-module'),
    Result = require('../../models/result');

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
    function addDataPostFunction(req, res) {
        let lines = req.param('votes').split('\n'),
            partidos = {}, aux;
        for (let i = 0, len = lines.length; i < len; i++) {
            aux = lines[i].split(' ');
            partidos[aux[0].replace(/(\r\n|\n|\r)/gm, "")] = aux[2].replace(/(\r\n|\n|\r)/gm, "");
        }
        let result = new Result({
            comunidad: 'desconocida',
            cod_provincia: req.param('province'),
            provincia: 'desconocida',
            poblacion: req.param('population'),
            num_mesas: req.param('tables'),
            total_censo_electoral: req.param('census'),
            total_votantes: req.param('voters'),
            votos_validos: 0,
            votos_candidaturas: 0,
            votos_blanco: req.param('blancos'),
            votos_nulos: req.param('nulos'),
            eleccion: {
                autor: req.param('author'),
                fecha: req.param('date')
            },
            partidos: partidos
        });
        result.save(function (err) {
            if (err) throw err;
            indexResponse(req, res, 'pages/add-data', 'Add data', {
                error:'NO',
                codigos: require('../../codigos')
            });
        });

    }
    function checkError(err) {
        if (err) {
            throw err;
        }
    }
    function deleteDataPostFunction(req, res) {
        let promises = [], options;

        for (let i = 0, len = req.param('results').length; i < len; i++) {
            options = {_id: req.param('results')[i]};
            promises.push(Result.remove(options, checkError));
        }


        Promise.all(promises).then(function () {
            console.log('all the results were deleted');
            Result.find({}, function (err, data) {
                checkError(err);
                indexResponse(req, res, 'pages/delete-data', 'Delete data', {
                    error:'NO',
                    data:data
                });
            });
        });

    }

    function graphicFormPostFunction(req, res) {
        Graphic.calculateDistrict(req, function (options) {
            res.render('pages/single-chart', options);
        });
    }

    function countryFormPostFunction(req, res) {
        Graphic.calculateCountry(req, function (options) {
           options['colors'] = require('../graphics/colors');
            res.render('pages/country-chart', options);
        });
    }

    function saveResultFunction(req, res) {
        console.log(req.body.result);
        res.send({result: req.body.result});
    }

    module.exports = {
        /**
         * @description Generic response
         * @function
         */
        indexResponse: indexResponse,

        /**
         * @description Simple if statement to check err var
         * @function
         */
        checkError: checkError,

        /**
         * @description Handles add data form
         * @function
         */
        addDataPostFunction: addDataPostFunction,

        /**
         * @description Handles delete data form
         * @function
         */
        deleteDataPostFunction: deleteDataPostFunction,

        /**
         * @description Handles single district chart form
         * @function
         */
        graphicFormPostFunction: graphicFormPostFunction,

        /**
         * @description Handles country chart form
         * @function
         */
        countryFormPostFunction: countryFormPostFunction,

        /**
         * @description Saves a result
         * @function
         */
        saveResultFunction: saveResultFunction
    };
})();

