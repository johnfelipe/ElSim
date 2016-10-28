'use strict';
var User   = require('./../models/user'),
    Log = require('./../models/log'),
    Resultado = require('./../models/resultado'),
    _ = require('./modules/util-module'),
    DB = require('./modules/dbmanager_module');

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
            _.prettyPrint('Users cleaned, added user demo.');
            Log.find({}).remove(function(){
                _.prettyPrint('Logs cleaned.');
                res.json({ success: true });
            });
        });
    }
};
/**
 * Lista los usuarios. Necesita autenticación.
 * @param req
 * @param res
 */
exports.userList = function(req, res) {
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
exports.userAdd = function(req, res) {
    res.send({
        result:'Not yet implemented'
    });
};

/**
 * Elimina un usuario
 * @param req
 * @param res
 */
exports.userDelete = function(req, res) {
    res.send({
        result:'Not yet implemented'
    });
};

/**
 * Actualiza un usuario
 * @param req
 * @param res
 */
exports.userUpdate = function(req, res) {
    res.send({
        result:'Not yet implemented'
    });
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
exports.getResultados = function(req, res) {
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
exports.addResultado = function(req,res) {
    res.send({
        result: 'Not yet implemented'
    });
};

/**
 * Actualiza un resultado.
 * @param req
 * @param res
 */
exports.updateResultadoById = function(req,res) {
    res.send({
        result: 'Not yet implemented'
    });
};

/**
 * Elimina un resultado.
 * @param req
 * @param res
 */
exports.deleteResultadoById = function(req,res) {
    res.send({
        result: 'Not yet implemented'
    });
};

/**
 * Vacía todos los resultados(be careful with this!)
 * @param req
 * @param res
 */
exports.cleanResultado = function(req,res){
    DB.cleanResultado(function(){
        res.send({result:'Resultado cleaned'});
    });
};

/**
 * Filtra resultados por anio.
 * @param req
 * @param res
 */
exports.getResultadoByAnio = function(req,res){
    DB.getResultadoByAnio(req.param('anio'),function(data){
        res.send({result:data});
    });
};

/**
 * Filtra resultados por provincia.
 * @param req
 * @param res
 */
exports.getResultadoByProvincia = function(req,res){
    DB.getResultadoByProvincia(req.param('cod_provincia'),function(data){
        res.send({result:data});
    });
};
/**
 * Filtra resultados por provincia.
 * @param req
 * @param res
 */
exports.getResultadoById = function(req,res){
    DB.getResultadoById(req.param('id'),function(data){
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
        res.send({result:'Executed'});
    });
};

/**
 * Lista los logs.
 * @param req
 * @param res
 */
exports.logsList = function(req,res){
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
exports.cleanLog = function(req,res){
    DB.cleanLog(function(){
        res.send({result:'Log cleaned'});
    });
};