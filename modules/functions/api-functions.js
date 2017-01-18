/* jshint esversion: 6 */

const User = require('../../models/user'),
    Log = require('../../models/log'),
    Result = require('../../models/result'),
    Subscriber = require('../../models/subscriber'),
    DB = require('../db-manager-module');

/**
 * All the callback functions of Api routes
 * @module functions/Api-functions
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

    function findOneLog(req, res) {
        resError(req, res);
    }

    function findOneUser(req, res) {
        resError(req, res);
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

    function apiWelcome(req, res) {
        apiResponse(req, res, false, {
            message: 'Hello from the API!',
            version: '0.0.1',
            contact: 'jesusgonzaleznovez@gmail.com'
        }, null);
    }

    function findAllResultados(req, res) {
        Result.find({}, function (err, data) {
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

    function hardReset(req,res){
        console.log('Hard reset starting...');
        let promises = [];
        promises.push(User.remove({},done));
        promises.push(Log.remove({},done));
        promises.push(Result.remove({},done));
        promises.push(Subscriber.remove({},done));
        Promise.all(promises).then(function(){
            console.log('Hard reset finished');
            res.send('SYSTEM WAS RESETED');
        });
        function done(err){
            if(err) console.log(err);
        }
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
         * @description To find one user
         */
        findOneUser: findOneUser,

        /**
         * @function
         * @description To find one log
         */
        findOneLog: findOneLog,

        /**
         * @function
         * @description To find logs
         */
        findLogs: findLogs,

        /**
         * @function
         * @description Delete all logs
         */
        deleteAllLogs: deleteAllLogs,

        hardReset: hardReset
    };
})();

