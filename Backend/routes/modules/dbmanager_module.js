/**
 * Variables globales del módulo
 */
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/test';
var Utils = require('./utils_module.js');
var utils = new Utils();


/**
 * Módulo para MongoDB con métodos auxiliares.
 * @returns {DbManager}
 * @constructor
 */
var DbManager = function(){
    var resultados = {};

    /**
     * Inserta el documento 'document' en la base de datos 'db', en la colección 'collection',
     * finaliza llamando a la función callback();
     * @param db
     * @param collection
     * @param document
     * @param callback
     */
    var insertDocument = function(db, collection,document, callback) {
        db.collection(collection).insertOne(
            document,
            function(err, result) {
                assert.equal(err, null);
                utils.prettyPrint('Inserted a document into the ' + collection + ' collection.');
                callback();
            }
        );
    };
    /**
     * Obtiene todos los logs de la colección 'logs'
     * @param db
     * @param callback
     */
    var findLogs = function(db, callback) {
        resultados = {};
        var cursor = db.collection('logs').find();
        cursor.each(function(err, doc) {
            assert.equal(err, null);
            if (doc != null) {
                utils.prettyPrint(doc);
                resultados[doc.date] = doc.action;
            } else {
                callback();
            }
        });
    };

    /**
     * Función auxiliar para guardar un log.
     * @param message
     */
    this.saveLog = function(message){
        var document = {
            'date': new Date().toLocaleString(),
            'action': message
        };
        MongoClient.connect(url, function(err, db) {
            assert.equal(null, err);
            insertDocument(db,'logs',document, function() {
                db.close();
            });
        });
    };

    /**
     * Función auxiliar para obtener los logs.
     * @param res
     */
    this.getLog = function(res){
        MongoClient.connect(url, function(err, db) {
            assert.equal(null, err);
            findLogs(db, function() {
                db.close();
                res.send(resultados);
            });
        });
    };
    return this;
};
module.exports = DbManager;
