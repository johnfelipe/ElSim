'use strict';
const Log = require('./../models/log'),
    Resultado = require('./../models/result'),
    User = require('./../models/user'),
    _ = require('./util-module'),
    Promise = require('bluebird');

/**
 * Module to handle the database.
 * @module modules/db-manager-module
 */
module.exports = {

    /** Init the real results with the stored csv files from Spain Goverment web */
    loadCsv: function (done) {
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
        Promise.all(promises).then(function(){
            console.log('All results saved');
            done();
        });
    },

    /** Save a log into the database */
    saveLog: function (message, done) {
        let l = new Log({
            message: message,
            date: new Date()
        });
        l.save(callbackLogSave);
        function callbackLogSave(err) {
            if (err) throw err;
            done();
        }
    },

    /** Remove all logs from the database */
    cleanLog: function (done) {
        Log.find({}).remove(done);
    },

    /** Remove all users from the database */
    cleanUser: function (done) {
        User.find({}).remove(done);
    },

    /** Save a user into the database */
    saveUser: function (user, done) {
        let u = new User(user);

        u.save(callbackUserSave);

        function callbackUserSave(err) {
            if (err) throw err;
            done();
        }
    },

    /** Get a result by year */
    getResultadoByAnio: function (anio, done) {
        Resultado.find({anio: anio}, callbackFind);

        function callbackFind(err, data) {
            if (err) throw err;
            done(data);
        }
    },

    /** Get a result by district */
    getResultadoByProvincia: function (cod, done) {
        Resultado.find({cod_provincia: cod}, callbackFind);

        function callbackFind(err, data) {
            if (err) throw err;
            done(data);
        }
    },

    /** Get a result by id */
    getResultadoById: function (id, done) {
        Resultado.findOne({_id: id}, function(err,data){
            if(err) throw err;
            done(data);
        });
    },

    /** Save a result into the database */
    saveResultado: function (result, done) {

        let r = new Resultado(result);
        r.eleccion = {
            fecha: result.fecha,
            autor: 'sistema'
        };
        r.save(function (err) {
            if (err) throw err;
            done();
        });
    },

    /** Remove all results from the database */
    cleanResultado: function (done) {
        Resultado.find({}).remove(done);
    },

    /** Remove a user filtered by email */
    deleteUserByEmail: function (email, done) {
        User.find({email: email}).remove(done);
    },

    /** Remove a user filtered by name */
    deleteUserByName: function (name, done) {
        User.find({name: name}).remove(done);
    }
};
