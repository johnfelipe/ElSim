/* jshint esversion: 6 */
'use strict';
/** Api routes under authentication */
const express = require('express'),
    router = express.Router(),
    API = require('../../modules/api');


module.exports =  () => {
    router.get('/:id', API.findOneLog);
    router.get('/', API.findLogs);

    router.delete('/', API.deleteAllLogs);

    return router;
};