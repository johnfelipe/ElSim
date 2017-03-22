/* jshint esversion: 6 */
'use strict';
/** Api routes under authentication */
const express = require('express'),
    router = express.Router(),
    API = require('../../modules/api');


module.exports =  () => {
    router.get('/:id', API.findOneResultado);
    router.get('/', API.findAllResultados);

    router.post('/', API.saveOneResultado);


    router.put('/:id', API.updateOneResultado);

    router.delete('/:id', API.deleteOneResultado);
    router.delete('/', API.deleteAllResultados);
    return router;
};