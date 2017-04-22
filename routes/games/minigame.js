/* jshint esversion: 6 */
'use strict';
const express = require('express'),
    router = express.Router(),
    response = require('../../modules/response'),
    sendError = require('../error').sendError;

router.get('/minigame', (req,res) => {
    sendError(req,res,'Not yet implemented.');
});

module.exports = router;

