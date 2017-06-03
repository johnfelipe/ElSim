const Users = require('../models/user');
const Logs = require('../models/log');
const Results = require('../models/result');
const Q = require('q');

class AllService {
    static loadAll() {
        let promise = Q.defer();

        let users, logs, results;

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
            .catch(promise.reject);

        return promise.promise;
    }
}
module.exports = AllService;