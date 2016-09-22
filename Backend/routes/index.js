var express = require('express');
var router = express.Router();
var functions = require('./functions.js');
var api = require('./api.js');

router.get('/', functions.index);


router.get('/api/hare/example', api.hareExample);
router.get('/api/', api.alive);
router.get('/api/add', api.add);

module.exports = router;
