'use strict';
const Log = require('./../models/log'),
    Resultado = require('./../models/result'),
    User = require('./../models/user'),
    _ = require('./util-module');

/**
 * Module to handle the database.
 * @module modules/db-manager-module
 */
module.exports = {

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

    cleanLog: function (done) {
        Log.find({}).remove(done);
    },

    cleanUser: function (done) {
        User.find({}).remove(done);
    },

    saveUser: function (user, done) {
        var u = new User(user);

        u.save(callbackUserSave);

        function callbackUserSave(err) {
            if (err) throw err;
            done();
        }
    },

    getResultadoByAnio: function (anio, done) {
        Resultado.find({anio: anio}, callbackFind);

        function callbackFind(err, data) {
            if (err) throw err;
            done(data);
        }
    },

    getResultadoByProvincia: function (cod, done) {
        Resultado.find({cod_provincia: cod}, callbackFind);

        function callbackFind(err, data) {
            if (err) throw err;
            done(data);
        }
    },

    getResultadoById: function (id, done) {
        Resultado.find({id: id}, callbackFind);

        function callbackFind(err, data, done) {
            if (err) throw err;
            done(data);
        }
    },

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

    cleanResultado: function (done) {
        Resultado.find({}).remove(done);
    },

    deleteUserByEmail: function (email, done) {
        User.find({email: email}).remove(done);
    },

    deleteUserByName: function (name, done) {
        User.find({name: name}).remove(done);
    }
};
