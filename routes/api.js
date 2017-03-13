/* jshint esversion: 6 */
'use strict';
/** Api routes under authentication */
const express = require('express'),
    router = express.Router(),
    API = require('../modules/api'),
    Auth = require('../passport/auth');


module.exports =  () => {
    router.post('/v1/authenticate', Auth.authenticate);
    router.get('/v1/', API.apiWelcome);

    router.get('/v1/setup', API.setup);

    /* be careful, this function reset all system with a simple get route! */
    router.get('/v1/reset', API.hardReset);

    router.get('/v1/', API.apiWelcome);
    router.get('/v1/csv', API.loadCsv);

    router.get('/v1/Users/:id', API.findOneUser);
    router.get('/v1/Users', API.findAllUsers);
    router.get('/v1/Logs/:id', API.findOneLog);
    router.get('/v1/Logs', API.findLogs);
    router.get('/v1/Results/:id', API.findOneResultado);
    router.get('/v1/Results', API.findAllResultados);
    router.get('/v1/Questions', API.getAllQuestions);

    router.post('/v1/Users', API.saveOneUser);
    router.post('/v1/Results', API.saveOneResultado);
    router.post('/v1/Questions', API.saveOneQuestion);

    router.put('/v1/Users/:id', API.updateOneUser);
    router.put('/v1/Results/:id', API.updateOneResultado);

    router.delete('/v1/Questions/:id', API.deleteOneQuestion);
    router.delete('/v1/Users/:id', API.deleteOneUser);
    router.delete('/v1/Logs', API.deleteAllLogs);
    router.delete('/v1/Results/:id', API.deleteOneResultado);
    router.delete('/v1/Results', API.deleteAllResultados);
    return router;
};