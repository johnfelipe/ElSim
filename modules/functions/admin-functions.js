/* jshint esversion: 6 */

const UF = require('./user-functions');

/**
 * All the callback functions of api routes
 * @module functions/admin-functions
 */
(function () {
    function adminSummaryFunction(req, res) {
        if (!req.user || req.user.email !== 'jesusgonzaleznovez@gmail.com') {
            res.render('pages/error',{
                result: 'fail',
                message: 'You are not the admin, sorry!',
                error: {
                    status: 401
                }
            });
        } else {
            UF.loadAll(loadDone);

        }
        function loadDone(logs,results,users){
            let options = {
                user: req.user,
                title: 'Administration',
                logs: logs,
                results: results,
                users: users
            };
            res.render('pages/admin', options);
        }
    }

    module.exports = {

        /**
         * @function
         * @description Shows summary of system
         */
        adminSummaryFunction: adminSummaryFunction
    };
})();

