'use strict';
var User   = require('./../models/user');
var Log = require('./../models/log');
var Resultado = require('./../models/resultado');
var DB = require('./modules/dbmanager_module');
var _ = require('./modules/utils_module');
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
 *
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