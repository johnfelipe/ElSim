/* jshint esversion: 6 */

const UF = require('./user-functions'),
    credentials = require('../../credentials');

/** All the callback functions of api routes */
(function () {
    const adminSummaryFunction = (req, res) => {
        const loadDone = (logs, results, users) => res.render('pages/auth/admin', {
                user: req.user,
                title: 'Administration',
                logs: logs,
                results: results,
                users: users
            }
        );

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
    };

    module.exports = {
        /** Shows summary of system */
        adminSummaryFunction: adminSummaryFunction
    };
})();

