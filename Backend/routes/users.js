/**
 * Rutas de la interfaz web relativas a usuarios
 */

'use strict';
var express = require('express');
var router = express.Router();

/**
 *  GET users listing.
 */
router.get('/', function(req, res, next) {
    res.send({
        response: 'ok',
        data:'Under costruction...'
    });
});

module.exports = router;
