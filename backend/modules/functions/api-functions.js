/* jshint esversion: 6 */

const User = require('./../../models/user'),
    Log = require('./../../models/log'),
    Resultado = require('./../../models/result'),
    DB = require('./../db-manager-module');

/**
 * All the callback functions of api routes
 * @module modules/functions/api-functions
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
            if (err) throw err;
            Log.find({}).remove(logRemoved);
        }

        function logRemoved() {
            let result = {
                result: 'OK',
                success: true
            };
            res.json(result);
        }
    }

    function findAllUsers(req, res) {
        User.find({}, userFinded);

        function userFinded(err, data) {
            if (err) throw err;
            let result = {
                result: 'OK',
                data: data
            };
            res.send(result);
        }
    }

    function saveOneUser(req, res) {
        throw new Error('Not yet implemented');
    }

    function deleteOneUser(req, res) {
        throw new Error('Not yet implemented');
    }

    function updateOneUser(req, res) {
        throw new Error('Not yet implemented');
    }

    function check(req, res) {
        res.json(req.decoded);
    }

    function apiWelcome(req, res) {
        res.json({
            message: 'Hello from the API!',
            version: '0.0.1',
            contact: 'jesusgonzaleznovez@gmail.com'
        });
    }

    function findAllResultados(req, res) {
        Resultado.find({}, function (err, data) {
            if (err) throw err;
            res.send({
                result: data
            });
        });
    }

    function saveOneResultado(req, res) {
        throw new Error('Not yet implemented');
    }

    function updateOneResultado(req, res) {
        throw new Error('Not yet implemented');
    }

    function deleteOneResultado(req, res) {
        throw new Error('Not yet implemented');
    }

    function deleteAllResultados(req, res) {
        DB.deleteAllResultados(function () {
            res.send({result: 'OK'});
        });
    }

    function findManyResultadosByAnio(req, res) {
        DB.findManyResultadosByAnio(req.param('anio'), function (data) {
            res.send({result: data});
        });
    }

    function findManyResultadosByProvincia(req, res) {
        DB.findManyResultadosByProvincia(req.param('cod_provincia'), function (data) {
            res.send({result: data});
        });
    }

    function findOneResultado(req, res) {
        DB.getResultadoById(req.param('id'), function (data) {
            res.send({result: data});
        });
    }

    function loadCsv(req, res) {
        DB.loadCsv(function () {
            res.send({result: 'OK'});
        });
    }

    function findLogs(req, res) {
        Log.find({}, function (err, data) {
            if (err) throw err;
            res.send({
                result: data
            });
        });
    }

    function deleteAllLogs(req, res) {
        DB.deleteAllLogs(function () {
            res.send({result: 'OK'});
        });
    }

    module.exports = {
        setup: setup,
        findAllUsers: findAllUsers,
        saveOneUser: saveOneUser,
        deleteOneUser: deleteOneUser,
        updateOneUser: updateOneUser,
        check: check,
        apiWelcome: apiWelcome,
        findAllResultados: findAllResultados,
        saveOneResultado: saveOneResultado,
        updateOneResultado: updateOneResultado,
        deleteOneResultado: deleteOneResultado,
        deleteAllResultados: deleteAllResultados,
        findManyResultadosByAnio: findManyResultadosByAnio,
        findManyResultadosByProvincia: findManyResultadosByProvincia,
        findOneResultado: findOneResultado,
        loadCsv: loadCsv,
        findLogs: findLogs,
        deleteAllLogs: deleteAllLogs
    };
})();

