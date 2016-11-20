'use strict';
const Log = require('./../models/log'),
    Resultado = require('./../models/result'),
    User = require('./../models/user'),
    _ = require('./util-module');

/**
 * Módulo para MongoDB con métodos auxiliares.
 * @returns {DbManager}
 * @constructor
 */
module.exports = {

    /**
     * Función que carga los ficheros csv con resultados históricos.
     * Parsea y guarda en la base de datos.
     * @param done{Function} callback
     */
    loadCsv: function (done) {
        var a = ['1977', '1979', '1982', '1986', '1989', '1993', '1996'];

        var i, len = a.length, path1, path2;
        for (i = 0; i < len; ++i) {
            path1 = './csv/' + a[i] + '.csv';
            path2 = './csv/' + a[i] + '_PARTIDOS.csv';
            _.readCsv(path1, path2, csvCallback);
        }

        function csvCallback(data) {
            var j, lenData = data.length;
            for (j = 0; j < lenData; ++j) {
                DbManager.saveResultado(data[j], saveResultadoCallback);
            }
        }

        function saveResultadoCallback() {
            // do something
        }

        done();
    },
    /**
     * Función para guardar logs en la base de datos.
     * @param message{String} mensaje que queremos guardar de log.
     * @param done{Function} callback
     */
    saveLog: function (message, done) {
        var l = new Log({
            message: message,
            date: new Date()
        });
        l.save(callbackLogSave);
        function callbackLogSave(err) {
            if (err) throw err;
            done();
        }
    },

    /**
     * Función para vaciar los logs.
     * @param done{Function} callback
     */
    cleanLog: function (done) {
        Log.find({}).remove(done);
    },

    /**
     * Función para vaciar los usuarios. BE CAREFUL
     * @param done{Function} callback
     */
    cleanUser: function (done) {
        User.find({}).remove(done);
    },

    /**
     * Función para guardar un usuario.
     * @param user{Object} datos del usuario.
     * @param done{Function} callback
     */
    saveUser: function (user, done) {
        var u = new User(user);

        u.save(callbackUserSave);

        function callbackUserSave(err) {
            if (err) throw err;
            done();
        }
    },

    /**
     * Función para buscar resultados por anio.
     * @param anio{Number} anio de búsqueda
     * @param done{Function} callback
     */
    getResultadoByAnio: function (anio, done) {
        Resultado.find({anio: anio}, callbackFind);

        function callbackFind(err, data) {
            if (err) throw err;
            done(data);
        }
    },
    /**
     * Función para buscar resultados por código de provincia.
     * @param cod{Number} código de provincia de búsqueda
     * @param done{Function} callback
     */
    getResultadoByProvincia: function (cod, done) {
        Resultado.find({cod_provincia: cod}, callbackFind);

        function callbackFind(err, data) {
            if (err) throw err;
            done(data);
        }
    },

    /**
     * Función para buscar un resultado por ID
     * @param id{String} id de la base de datos.
     * @param done{Function} callback
     */
    getResultadoById: function (id, done) {
        Resultado.find({id: id}, callbackFind);

        function callbackFind(err, data, done) {
            if (err) throw err;
            done(data);
        }
    },

    /**
     *
     * @param resultado
     * @param done
     */
    saveResultado: function (resultado, done) {

        var r = new Resultado(resultado);
        r.eleccion = {
            fecha: resultado.fecha,
            autor: 'sistema'
        };
        r.save(function (err) {
            if (err) throw err;
            done();
        });
    },
    /**
     *
     * @param done
     */
    cleanResultado: function (done) {
        Resultado.find({}).remove(done);
    },

    /**
     *
     * @param email
     * @param done
     */
    deleteUserByEmail: function (email, done) {
        User.find({email: email}).remove(done);
    },

    /**
     *
     * @param name
     * @param done
     */
    deleteUserByName: function (name, done) {
        User.find({name: name}).remove(done);
    }
};
