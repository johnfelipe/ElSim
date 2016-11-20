'use strict';
const User = require('./../../models/user'),
    Log = require('./../../models/log'),
    Resultado = require('./../../models/result'),
    DB = require('./../db-manager-module');

module.exports = {
    /**
     * Elimina todos los usuarios. Añade el usuario demo. Vacía los logs.
     * @param req
     * @param res
     */
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

    /**
     * Crea un usuario
     * @param req
     * @param res
     */
    saveOneUser: function (req, res) {
        throw new Error('Not yet implemented');
    },

    /**
     * Elimina un usuario
     * @param req
     * @param res
     */
    deleteOneUser: function (req, res) {
        throw new Error('Not yet implemented');
    },

    /**
     * Actualiza un usuario
     * @param req
     * @param res
     */
    updateOneUser: function (req, res) {
        throw new Error('Not yet implemented');
    },

    /**
     * Check request. Necesita autenticación.
     * @param req
     * @param res
     */
    check: function (req, res) {
        res.json(req.decoded);
    },
    /**
     * Hello from api. Necesita autenticación.
     * @param req
     * @param res
     */
    apiWelcome: function (req, res) {
        res.json({
            message: 'Hello from the API!',
            version: '0.0.1',
            contact: 'jesusgonzaleznovez@gmail.com'
        });
    },

    /**
     * Obtiene todos los resultados almacenados.
     * @param req
     * @param res
     */
    findAllResultados: function (req, res) {
        Resultado.find({}, function (err, data) {
            if (err) throw err;
            res.send({
                result: data
            });
        });
    },

    /**
     * Almacena un resultado.
     * @param req
     * @param res
     */
    saveOneResultado: function (req, res) {
        throw new Error('Not yet implemented');
    },

    /**
     * Actualiza un resultado.
     * @param req
     * @param res
     */
    updateOneResultado: function (req, res) {
        throw new Error('Not yet implemented');
    },

    /**
     * Elimina un resultado.
     * @param req
     * @param res
     */
    deleteOneResultado: function (req, res) {
        throw new Error('Not yet implemented');
    },

    /**
     * Vacía todos los resultados(be careful with this!)
     * @param req
     * @param res
     */
    deleteAllResultados: function (req, res) {
        DB.deleteAllResultados(function () {
            res.send({result: 'OK'});
        });
    },

    /**
     * Filtra resultados por anio.
     * @param req
     * @param res
     */
    findManyResultadosByAnio: function (req, res) {
        DB.findManyResultadosByAnio(req.param('anio'), function (data) {
            res.send({result: data});
        });
    },

    /**
     * Filtra resultados por provincia.
     * @param req
     * @param res
     */
    findManyResultadosByProvincia: function (req, res) {
        DB.findManyResultadosByProvincia(req.param('cod_provincia'), function (data) {
            res.send({result: data});
        });
    },
    /**
     * Filtra resultados por provincia.
     * @param req
     * @param res
     */
    findOneResultado: function (req, res) {
        DB.findOneResultado(req.param('id'), function (data) {
            res.send({result: data});
        });
    },

    /**
     * Parsea los csv del ministerio con los históricos de resultados electorales
     * al congreso.
     * @param req
     * @param res
     */
    loadCsv: function (req, res) {
        DB.loadCsv(function () {
            res.send({result: 'OK'});
        });
    },

    /**
     * Lista los logs.
     * @param req
     * @param res
     */
    findLogs: function (req, res) {
        Log.find({}, function (err, data) {
            if (err) throw err;
            res.send({
                result: data
            });
        });
    },

    /**
     * Elimina los logs.
     * @param req
     * @param res
     */
    deleteAllLogs: function (req, res) {
        DB.deleteAllLogs(function () {
            res.send({result: 'OK'});
        });
    }
};
