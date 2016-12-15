/* jshint esversion: 6 */
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
    /** Initial setup */
    setup: function (req, res) {
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
    },

    /** Function to get all users */
    findAllUsers: function (req, res) {
        User.find({}, userFinded);

        function userFinded(err, data) {
            if (err) throw err;
            let result = {
                result: 'OK',
                data: data
            };
            res.send(result);
        }
    },

    /** Function to save an user */
    saveOneUser: function (req, res) {
        throw new Error('Not yet implemented');
    },

    /** Function to delete an user */
    deleteOneUser: function (req, res) {
        throw new Error('Not yet implemented');
    },

    /** Function to update an user */
    updateOneUser: function (req, res) {
        throw new Error('Not yet implemented');
    },

    /** Function to check a request */
    check: function (req, res) {
        res.json(req.decoded);
    },

    /** Function to api welcome message */
    apiWelcome: function (req, res) {
        res.json({
            message: 'Hello from the API!',
            version: '0.0.1',
            contact: 'jesusgonzaleznovez@gmail.com'
        });
    },

    /** Function to get all results */
    findAllResultados: function (req, res) {
        Resultado.find({}, function (err, data) {
            if (err) throw err;
            res.send({
                result: data
            });
        });
    },

    /** Function to save a result */
    saveOneResultado: function (req, res) {
        throw new Error('Not yet implemented');
    },

    /** Function to update a result */
    updateOneResultado: function (req, res) {
        throw new Error('Not yet implemented');
    },

    /** Function to delete a result */
    deleteOneResultado: function (req, res) {
        throw new Error('Not yet implemented');
    },

    /** Function to delete all results */
    deleteAllResultados: function (req, res) {
        DB.deleteAllResultados(function () {
            res.send({result: 'OK'});
        });
    },

    /** Function filter results by year */
    findManyResultadosByAnio: function (req, res) {
        DB.findManyResultadosByAnio(req.param('anio'), function (data) {
            res.send({result: data});
        });
    },

    /** Function to filter results by district */
    findManyResultadosByProvincia: function (req, res) {
        DB.findManyResultadosByProvincia(req.param('cod_provincia'), function (data) {
            res.send({result: data});
        });
    },

    /** Function to find a result by id */
    findOneResultado: function (req, res) {
        DB.getResultadoById(req.param('id'), function (data) {
            res.send({result: data});
        });
    },

    /** Function to load csv files */
    loadCsv: function (req, res) {
        DB.loadCsv(function () {
            res.send({result: 'OK'});
        });
    },

    /** Function to get all logs */
    findLogs: function (req, res) {
        Log.find({}, function (err, data) {
            if (err) throw err;
            res.send({
                result: data
            });
        });
    },

    /** Function to delete all logs */
    deleteAllLogs: function (req, res) {
        DB.deleteAllLogs(function () {
            res.send({result: 'OK'});
        });
    }
};

