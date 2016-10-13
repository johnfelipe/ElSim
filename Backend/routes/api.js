'use strict';
var User   = require('./../models/user'),
    Log = require('./../models/log'),
    Resultado = require('./../models/resultado'),
    _ = require('./modules/utils_module');

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
            admin: true
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
    User.find({}, function(err, users) {
        res.json(users);
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
        message: 'Hello from the API!'
    });
};

/**
 * Da un listado de los resultados almacenados.
 * @param req
 * @param res
 */
exports.resultadosList = function(req,res) {
    Resultado.find({},function(err,data){
        if(err) throw err;
        res.send({
            result:data
        });
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
        var i, len = data.length;
        for(i = 0; i < len; i++){
            _.prettyPrint(data[i].anio)
        }
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
