/* jshint esversion: 6 */
'use strict';
/** Api routes under authentication */
const express = require('express'),
    router = express.Router(),
    API = require('../../modules/api'),
    Auth = require('../../passport/auth');


module.exports =  () => {
    router.post('/authenticate', Auth.authenticate);
    router.get('/', API.apiWelcome);
    router.get('/setup', API.setup);
    /** be careful, this function reset all system with a simple get route! */
    router.get('/reset', API.hardReset);
    return router;
};