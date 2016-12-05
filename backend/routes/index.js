'use strict';
const express = require('express'),
    router = express.Router(),
    IndexFunctions = require('./../modules/functions/index-functions'),
    api = require('./../modules/functions/api-functions');
/**
 * All the index routes
 * @see modules/functions/index-functions.js
 * @module routes/index
 */
router.get('/', IndexFunctions.indexGetFunction);
router.get('/help', IndexFunctions.helpGetFunction);
router.get('/leaflet-example', IndexFunctions.leafletExampleGetFunction);
router.get('/graphic-form', IndexFunctions.graphicFormGetFunction);
router.get('/learn', IndexFunctions.learnGetFunction);
router.get('/add-data', IndexFunctions.addDataGetFunction);
router.get('/stored-data', IndexFunctions.storedDataFunction);
router.get('/resultados/:id', api.findOneResultado);
router.post('/add-data', IndexFunctions.addDataPostFunction);
router.get('/delete-data', IndexFunctions.deleteDataGetFunction);
router.post('/delete-data', IndexFunctions.deleteDataPostFunction);
router.post('/graphic-form', IndexFunctions.graphicFormPostFunction);


module.exports = router;
