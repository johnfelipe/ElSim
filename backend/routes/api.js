'use strict';
const User   = require('./../models/user'),
    Log = require('./../models/log'),
    Resultado = require('./../models/result'),
    DB = require('./../modules/db-manager-module');

/**
 * Elimina todos los usuarios. Añade el usuario demo. Vacía los logs.
 * @param req
 * @param res
 */
exports.setup = function(req, res) {
    User.find({}).remove(initialize);

    function initialize(){

        var nick = new User({
            name: 'demo',
            email: 'demo@demo.com',
            password: 'password',
            admin: true,
            resultados: []
        });
        nick.save(function(err) {
            if (err) throw err;
            Log.find({}).remove(function(){
                res.json({
                    result: 'OK',
                    success: true
                });
            });
        });
    }
};
/**
 * Lista los usuarios. Necesita autenticación.
 * @param req
 * @param res
 */
exports.findAllUsers = function(req, res) {
    User.find({},function(err,data){
        if(err) throw err;
        res.send({
            result:data
        });
    });
};

/**
 * Crea un usuario
 * @param req
 * @param res
 */
exports.saveOneUser = function(req, res) {
    throw new Error('Not yet implemented');
};

/**
 * Elimina un usuario
 * @param req
 * @param res
 */
exports.deleteOneUser = function(req, res) {
    throw new Error('Not yet implemented');
};

/**
 * Actualiza un usuario
 * @param req
 * @param res
 */
exports.updateOneUser = function(req, res) {
    throw new Error('Not yet implemented');
};

/**
 * Check request. Necesita autenticación.
 * @param req
 * @param res
 */
exports.check = function(req, res) {
    res.json(req.decoded);
};
/**
 * Hello from api. Necesita autenticación.
 * @param req
 * @param res
 */
exports.apiWelcome = function(req, res) {
    res.json({
        message: 'Hello from the API!',
        version: '0.0.1',
        contact: 'jesusgonzaleznovez@gmail.com'
    });
};

/**
 * Obtiene todos los resultados almacenados.
 * @param req
 * @param res
 */
exports.findAllResultados = function(req, res) {
    Resultado.find({},function(err,data){
        if(err) throw err;
        res.send({
            result:data
        });
    });
};

/**
 * Almacena un resultado.
 * @param req
 * @param res
 */
exports.saveOneResultado = function(req, res) {
    throw new Error('Not yet implemented');
};

/**
 * Actualiza un resultado.
 * @param req
 * @param res
 */
exports.updateOneResultado = function(req, res) {
    throw new Error('Not yet implemented');
};

/**
 * Elimina un resultado.
 * @param req
 * @param res
 */
exports.deleteOneResultado = function(req, res) {
    throw new Error('Not yet implemented');
};

/**
 * Vacía todos los resultados(be careful with this!)
 * @param req
 * @param res
 */
exports.deleteAllResultados = function(req, res){
    DB.deleteAllResultados(function(){
        res.send({result:'OK'});
    });
};

/**
 * Filtra resultados por anio.
 * @param req
 * @param res
 */
exports.findManyResultadosByAnio = function(req, res){
    DB.findManyResultadosByAnio(req.param('anio'),function(data){
        res.send({result:data});
    });
};

/**
 * Filtra resultados por provincia.
 * @param req
 * @param res
 */
exports.findManyResultadosByProvincia = function(req, res){
    DB.findManyResultadosByProvincia(req.param('cod_provincia'),function(data){
        res.send({result:data});
    });
};
/**
 * Filtra resultados por provincia.
 * @param req
 * @param res
 */
exports.findOneResultado = function(req, res){
    DB.findOneResultado(req.param('id'),function(data){
        res.send({result:data});
    });
};

/**
 * Parsea los csv del ministerio con los históricos de resultados electorales
 * al congreso.
 * @param req
 * @param res
 */
exports.loadCsv = function(req,res){
    DB.loadCsv(function(){
        res.send({result:'OK'});
    });
};

/**
 * Lista los logs.
 * @param req
 * @param res
 */
exports.findLogs = function(req, res){
    Log.find({},function(err,data){
        if(err) throw err;
        res.send({
            result:data
        });
    });
};

/**
 * Elimina los logs.
 * @param req
 * @param res
 */
exports.deleteAllLogs = function(req, res){
    DB.deleteAllLogs(function(){
        res.send({result:'OK'});
    });
};