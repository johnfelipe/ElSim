/* jshint esversion: 6 */
'use strict';
/** Api routes under authentication */
const express = require('express'),
    router = express.Router(),
    API = require('../../modules/api');


module.exports =  () => {
    router.get('/', API.loadCsv);
    return router;
};