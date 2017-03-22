/* jshint esversion: 6 */
'use strict';

/** Api routes under authentication */
const express = require('express'),
    router = express.Router(),
    API = require('../../modules/api');

router.get('/:id', API.findOneUser);
router.get('/', API.findAllUsers);
router.post('/', API.saveOneUser);
router.put('/:id', API.updateOneUser);
router.delete('/:id', API.deleteOneUser);

module.exports =  router;
