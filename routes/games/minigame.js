

const express = require('express'),
    router = express.Router(),
    sendError = require('../error').sendError;

router.get('/minigame', (req,res) => {
    sendError(req,res,'Not yet implemented.');
});

module.exports = router;

