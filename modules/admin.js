/* jshint esversion: 6 */
const UF = require('./user');
let credentials;
try {
    credentials = require('../credentials');
} catch (e) {
    console.log('credentials.js not found, using jesusgonzaleznovez@gmail.com as user');
    credentials = {user: 'jesusgonzaleznovez@gmail.com'};
}

/**
 *
 * @module admin-functions
 */
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
        adminSummaryFunction
    };
})();
