const Users   = require('../models/user');
const Logs    = require('../models/log');
const Results = require('../models/result');
const Q       = require('q');

module.exports = () => {
    let promise = Q.defer();

    (async () => {
        try {
            let users   = await Users.find();
            let logs    = await Logs.find();
            let results = await Results.find();

            promise.resolve({logs, results, users});
        } catch (err) {
            promise.reject(err);
        }
    })();

    return promise.promise;
};