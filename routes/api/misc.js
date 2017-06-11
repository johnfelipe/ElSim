const express = require('express');
const router = express.Router();
const API = require('../../modules/api');
const Auth = require('../../passport/auth');

{
    router.post('/authenticate', Auth.authenticate);
    router.get('/', API.apiWelcome);

    module.exports = router;
}