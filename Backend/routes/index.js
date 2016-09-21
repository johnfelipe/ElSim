var express = require('express');
var router = express.Router();
var functions = require('./functions.js');
var api = require('./api.js');

router.get('/', functions.index);
router.get('/api/', api.alive);



module.exports = router;
