/* jshint esversion: 6*/
const Users = require('../models/user'),
    Logs = require('../models/log'),
    Results = require('../models/result'),
    Q = require('q');

class AllService {
    constructor() {

    }

    static loadAll() {
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
    }
}
module.exports = AllService;