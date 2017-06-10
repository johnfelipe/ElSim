/** Api routes under authentication */
const express = require('express');
const router = express.Router();
const API = require('../../modules/api');

{
    router.get('/:id', API.findOneUser);
    router.get('/', API.findAllUsers);
    router.post('/', API.saveOneUser);
    router.put('/:id', API.updateOneUser);
    router.delete('/', API.deleteOneUser);

    module.exports = router;
}