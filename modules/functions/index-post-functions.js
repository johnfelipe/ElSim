/* jshint esversion: 6 */
const Graphic = require('../graphics/graphic-module'),
    Result = require('../../models/result'),
    Colors = require('../graphics/colors'),
    Icons = require('../graphics/icons'),
    Codigos = require('../../codigos');

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
        indexResponse(req,res,'pages/misc/error','Not Implemented',{
            err: {
                status: 500
            },
            message: 'Not implemented'
        });
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
            poblacion: parseInt(req.param('population')),
            num_mesas: parseInt(req.param('num_mesas')),
            total_censo_electoral: parseInt(req.param('census')),
            total_votantes: parseInt(req.param('voters')),
            votos_validos: parseInt(req.param('voters')) - parseInt(req.param('nulos')),
            votos_candidaturas: (parseInt(req.param('voters')) - parseInt(req.param('nulos'))) - parseInt(req.param('blancos')) ,
            votos_blanco: parseInt(req.param('blancos')),
            votos_nulos: parseInt(req.param('nulos')),
            eleccion: {
                autor: req.param('author'),
                fecha: req.param('date')
            },
            partidos: partidos
        });
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
        let promises = [], options;

        for (let i = 0, len = req.param('results').length; i < len; i++) {
            options = {_id: req.param('results')[i]};
            promises.push(Result.remove(options, checkError));
        }


        Promise.all(promises).then(function () {
            console.log('all the results were deleted');
            Result.find({}, function (err, data) {
                indexResponse(req, res, 'pages/data/delete-data', 'Delete data', {
                    err: err,
                    data: data
                });
            });
        });

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

