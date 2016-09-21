var express = require('express');
var router = express.Router();
var functions = require('./functions.js');

router.get('/', functions.index);

module.exports = router;
