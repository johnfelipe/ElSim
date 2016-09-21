var express = require('express');
var router = express.Router();
var functions = require('./functions.js');
var instant_runoff = require('./instant_runoff.js');

router.get('/', functions.index);

module.exports = router;
