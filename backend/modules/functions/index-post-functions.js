/* jshint esversion: 6 */
const Graphic = require('./../graphics/graphic-module'),
    Result = require('./../../models/result');

/**
 * All the callback functions of index POST routes
 * @module functions/index-post-functions
 */
(function () {
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
            let options = {
                title: 'Add data',
                error: 'NO',
                codigos: require('./../../codigos'),
                user: req.user
            };
            res.render('pages/add-data', options);
        });

    }

    function deleteDataPostFunction(req, res) {
        let promises = [], options;

        for (let i = 0, len = req.param('results').length; i < len; i++) {
            options = {_id: req.param('results')[i]};
            promises.push(Result.remove(options, removed));
        }
        function removed(err) {
            if (err) throw err;
        }

        Promise.all(promises).then(function () {
            console.log('all the results were deleted');
            Result.find({}, function (err, data) {
                let options = {
                    title: 'Delete data',
                    error: 'NO',
                    data: data,
                    user: req.user
                };
                res.render('pages/delete-data', options);
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
            res.render('pages/country-chart', options);
        });
    }

    function saveResultFunction(req, res) {
        console.log(req.body.result);
        res.send({result: req.body.result});
    }

    module.exports = {
        /**
         * @description
         * @function
         */
        addDataPostFunction: addDataPostFunction,

        /**
         * @description
         * @function
         */
        deleteDataPostFunction: deleteDataPostFunction,

        /**
         * @description
         * @function
         */
        graphicFormPostFunction: graphicFormPostFunction,

        /**
         * @description
         * @function
         */
        countryFormPostFunction: countryFormPostFunction,

        /**
         * @description
         * @function
         */
        saveResultFunction: saveResultFunction
    };
})();

