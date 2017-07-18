const express         = require('express');
const router          = express.Router();
const API             = require('../../modules/api');
const isAuthenticated = require('../../passport/auth').isApiAuthenticated;

{
    router.get('/:id', isAuthenticated, API.findOneLog);
    router.get('/', isAuthenticated, API.findLogs);
    router.delete('/', isAuthenticated, API.deleteAllLogs);

    module.exports = router;
}