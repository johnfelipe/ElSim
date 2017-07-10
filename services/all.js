const Users   = require('../models/user');
const Logs    = require('../models/log');
const Results = require('../models/result');
const Q       = require('q');

class AllService {
    static async loadAll() {
        let promise = Q.defer();

        try {
            let users   = await Users.find();
            let logs    = await Logs.find();
            let results = await Results.find();

            promise.resolve({logs, results, users});
        } catch (err) {
            promise.reject(err);
        }

        return promise.promise;
    }
}
module.exports = AllService;