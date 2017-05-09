/* jshint esversion: 6*/
const Users = require('../models/user'),
    Logs = require('../models/log'),
    Results = require('../models/result'),
    console = require('better-console'),
    Q = require('q');

{

    const loadAll = () => {
        let promise = Q.defer();

        let users, logs, results;

        const reject = (err) => promise.reject(err);

        Users.find()
            .then((data) => {
                users = [...data];
                Logs.find()
                    .then((data) => {
                        logs = [...data];
                        Results.find()
                            .then((data) => {
                                results = [...data];
                                promise.resolve({logs, results, users});
                            }).catch(reject);
                    }).catch(reject);
            }).catch(reject);

        return promise.promise;
    };

    module.exports = {
        loadAll
    };

}