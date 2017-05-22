

/** Api routes under authentication */
const express = require('express'),
    router = express.Router(),
    API = require('../../modules/api');

router.get('/:id', API.findOneLog);
router.get('/', API.findLogs);
router.delete('/', API.deleteAllLogs);

module.exports = router;
