/* jshint esversion: 6 */

const User = require('../../models/user'),
    Log = require('../../models/log'),
    Result = require('../../models/result'),
    DB = require('../db-manager-module');

/**
 * All the callback functions of api routes
 * @module functions/api-functions
 */
(function () {
    function setup(req, res) {
        User.find({}).remove(initialize);

        function initialize() {
            let nick = new User({
                name: 'demo',
                email: 'demo@demo.com',
                password: 'password',
                admin: true,
                resultados: []
            });
            nick.save(userSaved);
        }

        function userSaved(err) {
            if (err) {
                throw err;
            }
            Log.find({}).remove(logRemoved);
        }

        function logRemoved() {
            apiResponse(req, res, false, 'System initialized correctly', null);
        }
    }

    function findAllUsers(req, res) {
        User.find({}, userFinded);

        function userFinded(err, data) {
            apiResponse(req, res, err, 'All users', data);
        }
    }

    function saveOneUser(req, res) {
        resError(req, res);
    }

    function resError(req, res) {
        let result;
        result = {
            result: 'fail',
            success: false,
            message: 'Not yet implemented',
            data: null
        };
        res.send(result);
    }

    function deleteOneUser(req, res) {
        resError(req, res);
    }

    function updateOneUser(req, res) {
        resError(req, res);
    }

    function check(req, res) {
        res.json(req.decoded);
    }

    function apiWelcome(req, res) {
        apiResponse(req, res, false, {
            message: 'Hello from the API!',
            version: '0.0.1',
            contact: 'jesusgonzaleznovez@gmail.com'
        }, null);
    }

    function findAllResultados(req, res) {
        Result.find({}, function (err, data) {
            console.log(err,data);
            apiResponse(req, res, err, 'All results', data);
        });
    }

    function saveOneResultado(req, res) {
        resError(req, res);
    }

    function updateOneResultado(req, res) {
        resError(req, res);
    }

    function deleteOneResultado(req, res) {
        resError(req, res);
    }

    function deleteAllResultados(req, res) {
        DB.deleteAllResultados(function () {
            apiResponse(req, res, false, 'All results removed', null);
        });
    }

    function findManyResultadosByAnio(req, res) {
        DB.findManyResultadosByAnio(req.param('anio'), function (data) {
            apiResponse(req, res, false, 'All results by year', data);
        });
    }

    function findManyResultadosByProvincia(req, res) {
        DB.findManyResultadosByProvincia(req.param('cod_provincia'), function (data) {
            apiResponse(req, res, false, 'All results by district', data);
        });
    }

    function findOneResultado(req, res) {
        DB.getResultadoById(req.param('id'), function (data) {
            apiResponse(req, res, false, 'Result', data);
        });
    }

    function loadCsv(req, res) {
        DB.loadCsv(function () {
            apiResponse(req, res, false, 'CSVs loaded', null);
        });
    }

    function findLogs(req, res) {
        Log.find({}, function (err, data) {
            apiResponse(req, res, err, 'All logs', data);
        });
    }

    function deleteAllLogs(req, res) {
        DB.deleteAllLogs(function () {
            apiResponse(req, res, false, 'All logs removed', null);
        });
    }

    function apiResponse(req, res, err, message, data) {
        let options;
        if (err) {
            console.log('ERROR:' + err);
            options = {
                result: 'fail',
                success: false,
                message: err,
                data: null
            };
        } else {
            console.log('DATA' + data);
            options = {
                result: 'OK',
                success: true,
                message: message,
                data: data
            };
        }
        res.send(options);
    }

    module.exports = {
        /**
         * @function
         * @description Generic API response
         */
        apiResponse: apiResponse,
        /**
         * @function
         * @description Generic error response
         */
        resError: resError,

        /**
         * @function
         * @description Initial demo setup
         */
        setup: setup,

        /**
         * @function
         * @description Find all users
         */
        findAllUsers: findAllUsers,

        /**
         * @function
         * @description Saves one user
         */
        saveOneUser: saveOneUser,

        /**
         * @function
         * @description Deletes one user
         */
        deleteOneUser: deleteOneUser,

        /**
         * @function
         * @description Updates one user
         */
        updateOneUser: updateOneUser,

        /**
         * @function
         * @description Checks system info
         */
        check: check,

        /**
         * @function
         * @description Api welcome function
         */
        apiWelcome: apiWelcome,

        /**
         * @function
         * @description Finds all results
         */
        findAllResultados: findAllResultados,

        /**
         * @function
         * @description Saves one result
         */
        saveOneResultado: saveOneResultado,

        /**
         * @function
         * @description Updates one result
         */
        updateOneResultado: updateOneResultado,

        /**
         * @function
         * @description Deletes one result
         */
        deleteOneResultado: deleteOneResultado,

        /**
         * @function
         * @description Deletes all results
         */
        deleteAllResultados: deleteAllResultados,

        /**
         * @function
         * @description Finds many results by year
         */
        findManyResultadosByAnio: findManyResultadosByAnio,

        /**
         * @function
         * @description Finds many results by district
         */
        findManyResultadosByProvincia: findManyResultadosByProvincia,

        /**
         * @function
         * @description Finds one result
         */
        findOneResultado: findOneResultado,

        /**
         * @function
         * @description Loads results in csv format
         */
        loadCsv: loadCsv,

        /**
         * @function
         * @description To find logs
         */
        findLogs: findLogs,

        /**
         * @function
         * @description Delete all logs
         */
        deleteAllLogs: deleteAllLogs
    };
})();
