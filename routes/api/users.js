const express            = require('express');
const router             = express.Router();
const API                = require('../../modules/api');
const isApiAuthenticated = require('../../passport/auth').isApiAuthenticated;

{
    router.get('/:id', isApiAuthenticated, API.findOneUser);
    router.get('/', isApiAuthenticated, API.findAllUsers);
    router.post('/', isApiAuthenticated, API.saveOneUser);
    router.put('/:id', isApiAuthenticated, API.updateOneUser);
    router.delete('/', isApiAuthenticated, API.deleteOneUser);

    module.exports = router;
}