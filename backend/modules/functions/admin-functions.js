/* jshint esversion: 6 */

const User = require('./../../models/user'),
    Log = require('./../../models/log'),
    Result = require('./../../models/result'),
    DB = require('./../db-manager-module');

/**
 * All the callback functions of api routes
 * @module functions/api-functions
 */
(function () {
    function adminSummaryFunction(req, res) {
        if (req.user.email !== 'jesusgonzaleznovez@gmail.com') {
            res.send({
                result: 'fail',
                status: 'ok',
                message: 'You are not the admin, sorry!'
            });
        } else {
            let promises = [], users, logs, results;
            promises.push(
                User.find({}, function (err, data) {
                    users = data;
                })
            );
            promises.push(
                Log.find({}, function (err, data) {
                    logs = data;
                })
            );
            promises.push(
                Result.find({}, function (err, data) {
                    results = data;
                })
            );
            Promise.all(promises).then(function(){
                let options = {
                    user: req.user,
                    title: 'Administration',
                    logs: logs,
                    results: results,
                    users: users
                };
                res.render('pages/admin', options);
            });
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

