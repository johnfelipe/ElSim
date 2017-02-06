/* jshint esversion: 6 */

const UF = require('./user-functions'),
    credentials = require('../../credentials');

/**
 * All the callback functions of api routes
 * @module functions/admin-functions
 */
(function () {
    function adminSummaryFunction(req, res) {
        if (!req.user || req.user.email !== credentials.user) {
            res.render('pages/misc/error', {
                result: 'fail',
                message: 'You are not the admin, sorry!',
                error: {
                    status: 401
                }
            });
        } else {
            UF.loadAll(loadDone);

        }
        function loadDone(logs, results, users) {
            let options = {
                user: req.user,
                title: 'Administration',
                logs: logs,
                results: results,
                users: users
            };
            res.render('pages/auth/admin', options);
        }
    }

    module.exports = {
        /** Shows summary of system */
        adminSummaryFunction: adminSummaryFunction
    };
})();

