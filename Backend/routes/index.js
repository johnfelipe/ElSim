var express = require('express');
var router = express.Router();
var functions = require('./functions.js');
var dhondt = require('./dhondt_module.js');
var uninominal = require('./uninominal.js');
var instant_runoff = require('./instant_runoff.js');

router.get('/', functions.index);
router.get('/dhondtExample',dhondt.dhondtExample);
router.get('/uninominalExample', uninominal.uninominalExample);
router.get('/instantRunoffExample', instant_runoff.instantRunoffExample);

module.exports = router;
