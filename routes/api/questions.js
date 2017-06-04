const express = require('express');
const router = express.Router();
const API = require('../../modules/api');

{
    router.get('/', API.getAllQuestions);
    router.post('/', API.saveOneQuestion);
    router.delete('/', API.deleteOneQuestion);

    module.exports = router;
}