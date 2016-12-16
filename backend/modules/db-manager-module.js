/* jshint esversion: 6 */

const Log = require('./../models/log'),
    Resultado = require('../models/result'),
    User = require('../models/user'),
    _ = require('./util-module'),
    Promise = require('bluebird');

/**
 * Module to handle the database.
 * @module modules/db-manager-module
 */
(function () {

    function loadCsv(done) {
        const a = ['1977', '1979', '1982', '1986', '1989', '1993', '1996'];

        let path1, path2, promises = [];
        for (let i = 0, len = a.length; i < len; ++i) {
            path1 = './csv/' + a[i] + '.csv';
            path2 = './csv/' + a[i] + '_PARTIDOS.csv';
            _.readCsv(path1, path2, csvCallback);
        }

        function csvCallback(data) {
            for (let j = 0, lenData = data.length; j < lenData; ++j) {
                promises.push(DbManager.saveResultado(data[j], saveResultadoCallback));
            }
        }

        function saveResultadoCallback() {
            console.log('Result saved...');
        }

        Promise.all(promises).then(function () {
            console.log('All results saved');
            done();
        });
    }

    function saveLog(message, done) {
        let l = new Log({
            message: message,
            date: new Date()
        });
        l.save(callbackLogSave);
        function callbackLogSave(err) {
            if (err) throw err;
            done();
        }
    }

    function cleanLog(done) {
        Log.find({}).remove(done);
    }

    function cleanUser(done) {
        User.find({}).remove(done);
    }

    function saveUser(user, done) {
        let u = new User(user);

        u.save(callbackUserSave);

        function callbackUserSave(err) {
            if (err) throw err;
            done();
        }
    }

    function getResultadoByAnio(anio, done) {
        Resultado.find({anio: anio}, callbackFind);

        function callbackFind(err, data) {
            if (err) throw err;
            done(data);
        }
    }

    function getResultadoByProvincia(cod, done) {
        Resultado.find({cod_provincia: cod}, callbackFind);

        function callbackFind(err, data) {
            if (err) throw err;
            done(data);
        }
    }

    function getResultadoById(id, done) {
        Resultado.findOne({_id: id}, function (err, data) {
            if (err) throw err;
            done(data);
        });
    }

    function saveResultado(result, done) {

        let r = new Resultado(result);
        r.eleccion = {
            fecha: result.fecha,
            autor: 'sistema'
        };
        r.save(function (err) {
            if (err) throw err;
            done();
        });
    }

    function cleanResultado(done) {
        Resultado.find({}).remove(done);
    }

    function deleteUserByEmail(email, done) {
        User.find({email: email}).remove(done);
    }

    function deleteUserByName(name, done) {
        User.find({name: name}).remove(done);
    }

    module.exports = {
        loadCsv: loadCsv,
        saveLog: saveLog,
        saveUser: saveUser,
        getResultadoByAnio: getResultadoByAnio,
        getResultadoByProvincia: getResultadoByProvincia,
        getResultadoById: getResultadoById,
        saveResultado: saveResultado,
        cleanResultado: cleanResultado,
        deleteUserByEmail: deleteUserByEmail,
        deleteUserByName: deleteUserByName
    }
})();

