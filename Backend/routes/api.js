'use strict';
var DbManager = require('./modules/dbmanager_module.js');
var User   = require('./../models/user');
var Graphic = require('./modules/graphic_module.js');
var Hare = require('./modules/hare_module.js');
/**
 * Ruta que comprueba si la api está operativa.
 * @param req
 * @param res
 */
exports.alive = function(req, res) {
   res.json({response:'API is alive!'});
};

/**
 * Obtiene todos los logs.
 * @param req
 * @param res
 */
exports.getLogs = function(req, res) {
    DbManager.getLog(res);
};

/**
 * Elimina todos los logs.
 * @param req
 * @param res
 */
exports.cleanLogs = function(req, res) {
    DbManager.cleanLog(res);
};

/**
 * Calcula un ejemplo de tipo Hare y lo devuelve en JSON.
 * @param req
 * @param res
 */
exports.hareExample = function(req,res){
    var object = new Hare();
    object.initExample();
    object.compute();
    DbManager.saveLog('Hare example calculated');
    res.json({
        response:'Hare example calculated',
        result: object.partidos,
        cociente: object.cociente,
        total: object.totalVotos()
    });
};

/**
 * Método de ejemplo de POST con parámetros y respuesta en JSON.
 * @param req
 * @param res
 */
exports.add = function(req,res) {
    if(req.method === 'POST') {
        if (req.body.num1 === undefined || req.body.num2 === undefined) {
            res.json({
                response: 'Operation a + b',
                result: 'Error, parameters num1 and/or num2 are not found'
            });
        }
        var n1 = req.body.num1;
        var n2 = req.body.num2;
        res.json({
            response: 'Operation a + b',
            result: n1 + n2
        });
    } else {
        res.json({
            response: 'This method must be called with POST'
        });
    }
};

/**
 * Devuelve una gráfica de barras en SVG
 * @param req
 * @param res
 */
exports.barChartExample = function(req,res){
    var object = new Graphic();
    object.barChartExample();
    DbManager.saveLog('barChartExample executed');
    res.json({
        response: object.d3n.svgString()
    });
};


/**
 * Devuelve una gráfica de tarta en SVG
 * @param req
 * @param res
 */
exports.pieChartExample = function(req,res){
    var object = new Graphic();
    object.pieChartExample();
    res.json({
        response:object.d3n.svgString()
    });
};

/**
 * Devuelve un mapa/gráfica de EEUU en SVG
 * @param req
 * @param res
 */
exports.jsonExample = function(req,res){
    var object = new Graphic();
    object.jsonExample();
    //res.writeHead(200, {'Content-Type': 'image/svg+xml'});
    res.json({
        response:object.d3n.svgString()
    });
};

exports.setup = function(req, res) {
    var nick = new User({
        name: 'Nick Cerminara',
        email: 'jesusgonzaleznovez@gmail.com',
        password: 'password',
        admin: true
    });
    nick.save(function(err) {
        if (err) throw err;
        console.log('User saved successfully');
        res.json({ success: true });
    });
};

exports.userList = function(req, res) {
    User.find({}, function(err, users) {
        res.json(users);
    });
};

exports.check = function(req, res) {
    res.json(req.decoded);
};

exports.apiWelcome = function(req, res) {
    res.json({ message: 'Welcome to the coolest API on earth!' });
};
