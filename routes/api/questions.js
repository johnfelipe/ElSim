const express = require('express');
const router  = express.Router();
const API     = require('../../modules/api');

{
    router.get('/', API.getAllQuestions);
    router.post('/', API.saveOneQuestion);
    router.delete('/', API.deleteOneQuestion);
    router.post('/answer', API.answer);
    module.exports = router;
}