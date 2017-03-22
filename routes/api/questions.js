/* jshint esversion: 6 */
'use strict';
/** Api routes under authentication */
const express = require('express'),
    router = express.Router(),
    API = require('../../modules/api');


module.exports = () => {
    router.get('/', API.getAllQuestions);
    router.post('/', API.saveOneQuestion);
    router.delete('/:id', API.deleteOneQuestion);
    return router;
};