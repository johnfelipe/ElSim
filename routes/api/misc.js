

/** Api routes under authentication */
const express = require('express'),
    router = express.Router(),
    API = require('../../modules/api'),
    Auth = require('../../passport/auth');

{
    router.post('/authenticate', Auth.authenticate);
    router.get('/', API.apiWelcome);

    module.exports = router;
}