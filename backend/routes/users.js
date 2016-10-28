/**
 * Rutas de la interfaz web relativas a usuarios
 */

'use strict';
const express = require('express'),
    router = express.Router();

/**
 *  GET users listing.
 */
router.get('/', function(req, res, next) {
    throw new Error('Not yet implemented');
});

module.exports = router;
