const express = require('express');
const router = express.Router();
const API = require('../../modules/api');

{
    router.get('/:id', API.findOneLog);
    router.get('/', API.findLogs);
    router.delete('/', API.deleteAllLogs);

    module.exports = router;
}