/* jshint esversion: 6 */
'use strict';
/** Api routes under authentication */
const express = require('express'),
    router = express.Router(),
    API = require('../modules/functions/api-functions'),
    Auth = require('../passport/auth');


module.exports =  () => {
    router.post('/v1/authenticate', Auth.authenticate);
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