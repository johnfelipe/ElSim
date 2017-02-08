/* jshint esversion: 6 */
'use strict';
/** Api routes under authentication */
const express = require('express'),
    router = express.Router(),
    jwt = require('jsonwebtoken'),
    User = require('../models/user'),
    config = require('../config'),
    API = require('../modules/functions/api-functions'),
    bCrypt = require('bcrypt-nodejs');

/**
 * To check if is authenticated
 * @function app/isAuthenticated
 */
let isAuthenticated = function (req, res, next) {
    let token = req.body.token || req.param('token') || req.headers['x-access-token'];
    if (token) {
        jwt.verify(token, config.secret, function (err, decoded) {
            if (err) {
                return res.json({success: false, message: 'Failed to authenticate token.'});
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });
    }
};

let isValidPassword = function (user, password) {
    return bCrypt.compareSync(password, user.password);
};
/**
 * Function to authenticate
 * @function app/authenticate
 */
let authenticate = function (req, res) {
    User.findOne({email: req.body.email}, done);
    function done(err, user) {
        let object = {
            success: false,
            message: 'Authentication failed',
            token: null
        };
        if (err) throw err;
        if (user) {
            if (isValidPassword(user,req.body.password)) {
                let token = jwt.sign(user, config.secret, {
                    expiresIn: 3600 // expires in 1 hours
                });
                object.success = true;
                object.message = 'Enjoy your token!';
                object.token = token;
            }
        }
        res.json(object);
    }
};
module.exports = function () {
    router.post('/v1/authenticate', authenticate);
    router.get('/v1/', API.apiWelcome);

    router.get('/v1/setup', API.setup);

    /* be careful, this function reset all system with a simple get route! */
    router.get('/v1/reset', API.hardReset);

    router.get('/v1/', API.apiWelcome);
    router.get('/v1/csv', API.loadCsv);

    router.get('/v1/users/:id', API.findOneUser);
    router.get('/v1/users', API.findAllUsers);
    router.get('/v1/logs/:id', API.findOneLog);
    router.get('/v1/logs', API.findLogs);
    router.get('/v1/results/:id', API.findOneResultado);
    router.get('/v1/results', API.findAllResultados);

    router.post('/v1/users', API.saveOneUser);
    router.post('/v1/results', API.saveOneResultado);

    router.put('/v1/users/:id', API.updateOneUser);
    router.put('/v1/results/:id', API.updateOneResultado);

    router.delete('/v1/users/:id', API.deleteOneUser);
    router.delete('/v1/logs', API.deleteAllLogs);
    router.delete('/v1/results/:id', API.deleteOneResultado);
    router.delete('/v1/results', API.deleteAllResultados);
    return router;
};