const express = require('express');
const router = express.Router();
const API = require('../../modules/api');

{
    router.get('/:id', API.findOneResultado);
    router.get('/', API.findAllResultados);
    router.post('/', API.saveOneResultado);
    router.put('/:id', API.updateOneResultado);
    router.delete('/', API.deleteOneResultado);
    router.delete('/all', API.deleteAllResultados);
    router.post('/compare', API.compare);
    router.post('/country', API.country);
    router.post('/district', API.district);
    router.post('/district/chart', API.districtChart);

    module.exports = router;
}