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

        const handleResults = (data) => {
            results = [...data];
            promise.resolve({logs, results, users});
        };

        const handleLogs = (data) => {
            logs = [...data];
            return Results.find();
        };

        const handleUsers = (data) => {
            users = [...data];
            return Logs.find();
        };

        Users.find()
            .then(handleUsers)
            .then(handleLogs)
            .then(handleResults)
            .catch(reject);

        return promise.promise;
    }
}
module.exports = AllService;