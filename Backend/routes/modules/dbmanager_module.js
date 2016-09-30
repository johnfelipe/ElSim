'use strict';
/**
 * Variables globales del módulo
 */
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/test';
var _ = require('./utils_module.js');

/**
 * Módulo para MongoDB con métodos auxiliares.
 * @returns {DbManager}
 * @constructor
 */
class DbManager{
    constructor(){

    }

    /**
     * Inserta el documento 'document' en la base de datos 'db', en la colección 'collection',
     * finaliza llamando a la función callback();
     * @param db
     * @param collection
     * @param document
     * @param callback
     */
    static insertDocument(db, collection,document, callback) {
        db.collection(collection).insertOne(
            document,
            function(err, result) {
                assert.equal(err, null);
                //_.prettyPrint('Inserted a document into the ' + collection + ' collection.\nResult:\n' + result);
                callback();
            }
        );
    }
    /**
     * Obtiene todos los logs de la colección 'logs'
     * @param db
     * @param callback
     */
    static findLogs(db, callback) {
        var resultados = [];
        var cursor = db.collection('logs').find();
        cursor.each(function(err, doc) {
            assert.equal(err, null);
            if (doc != null) {
                //_.prettyPrint(doc);
                resultados.push(doc);
            } else {
                callback(resultados);
            }
        });
    }

    /**
     * Función auxiliar para guardar un log.
     * @param message{String}
     */
    static saveLog(message){
        var document = {
            'date': new Date().toLocaleString(),
            'action': message
        };
        MongoClient.connect(url, function(err, db) {
            assert.equal(null, err);
            DbManager.insertDocument(db,'logs',document, function() {
                db.close();
            });
        });
    }

    /**
     * Función auxiliar para obtener los logs.
     * @param res
     */
    static getLog(res){
        MongoClient.connect(url, function(err, db) {
            assert.equal(null, err);
            DbManager.findLogs(db, function(resultados) {
                db.close();
                res.send(resultados);
            });
        });
    }

    /**
     * Limpia el log.
     * @param res
     */
    static cleanLog(res){
        MongoClient.connect(url, function(err, db) {
            assert.equal(null, err);
            db.collection('logs').remove({});
            res.send({response:'OK', data:'Logs cleaned'});
        });
    }
}
module.exports = DbManager;
