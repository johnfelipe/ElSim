const express            = require('express');
const router             = express.Router();
const API                = require('../../modules/api');
const isApiAuthenticated = require('../../passport/auth').isApiAuthenticated;

{
    router.get('/:id', isApiAuthenticated, API.findOneResultado);
    router.get('/', isApiAuthenticated, API.findAllResultados);
    router.post('/', isApiAuthenticated, API.saveOneResultado);
    router.put('/:id', isApiAuthenticated, API.updateOneResultado);
    router.delete('/', isApiAuthenticated, API.deleteOneResultado);
    router.delete('/all', isApiAuthenticated, API.deleteAllResultados);
    router.post('/compare', isApiAuthenticated, API.compare);
    router.post('/country', isApiAuthenticated, API.country);
    router.post('/district', isApiAuthenticated, API.district);
    router.post('/district/chart', isApiAuthenticated, API.districtChart);

    module.exports = router;
}