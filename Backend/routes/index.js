var express = require('express');
var router = express.Router();
var functions = require('./functions.js');
var dhondt = require('./dhondt_module.js');
var uninominal = require('./uninominal.js');

router.get('/', functions.index);
router.get('/dhondtExample',dhondt.dhondtExample);
router.get('/uninominalExample', uninominal.uninominalExample);

module.exports = router;
