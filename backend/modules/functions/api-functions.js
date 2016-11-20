'use strict';
const User = require('./../../models/user'),
    Log = require('./../../models/log'),
    Resultado = require('./../../models/result'),
    DB = require('./../db-manager-module');
/**
 * All the callback functions of api routes
 * @module modules/functions/api-functions
 */
module.exports = {
    setup: function (req, res) {
        User.find({}).remove(initialize);

        function initialize() {
            var nick = new User({
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
            var result = {
                result: 'OK',
                success: true
            };
            res.json(result);
        }
    },
    /**
     * Lista los usuarios. Necesita autenticación.
     * @param req
     * @param res
     */
    findAllUsers: function (req, res) {
        User.find({}, userFinded);

        function userFinded(err, data) {
            if (err) throw err;
            var result = {
                result: 'OK',
                data: data
            };
            res.send(result);
        }
    },

    saveOneUser: function (req, res) {
        throw new Error('Not yet implemented');
    },

    deleteOneUser: function (req, res) {
        throw new Error('Not yet implemented');
    },

    updateOneUser: function (req, res) {
        throw new Error('Not yet implemented');
    },


    check: function (req, res) {
        res.json(req.decoded);
    },

    apiWelcome: function (req, res) {
        res.json({
            message: 'Hello from the API!',
            version: '0.0.1',
            contact: 'jesusgonzaleznovez@gmail.com'
        });
    },

    findAllResultados: function (req, res) {
        Resultado.find({}, function (err, data) {
            if (err) throw err;
            res.send({
                result: data
            });
        });
    },

    saveOneResultado: function (req, res) {
        throw new Error('Not yet implemented');
    },

    updateOneResultado: function (req, res) {
        throw new Error('Not yet implemented');
    },

    deleteOneResultado: function (req, res) {
        throw new Error('Not yet implemented');
    },

    deleteAllResultados: function (req, res) {
        DB.deleteAllResultados(function () {
            res.send({result: 'OK'});
        });
    },


    findManyResultadosByAnio: function (req, res) {
        DB.findManyResultadosByAnio(req.param('anio'), function (data) {
            res.send({result: data});
        });
    },

    findManyResultadosByProvincia: function (req, res) {
        DB.findManyResultadosByProvincia(req.param('cod_provincia'), function (data) {
            res.send({result: data});
        });
    },

    findOneResultado: function (req, res) {
        DB.findOneResultado(req.param('id'), function (data) {
            res.send({result: data});
        });
    },

    loadCsv: function (req, res) {
        DB.loadCsv(function () {
            res.send({result: 'OK'});
        });
    },

    findLogs: function (req, res) {
        Log.find({}, function (err, data) {
            if (err) throw err;
            res.send({
                result: data
            });
        });
    },

    deleteAllLogs: function (req, res) {
        DB.deleteAllLogs(function () {
            res.send({result: 'OK'});
        });
    }
};
