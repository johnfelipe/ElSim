const Users   = require('../models/user');
const Logs    = require('../models/log');
const Results = require('../models/result');
const Q       = require('q');

module.exports = async () => {

    try {
        let users   = await Users.find();
        let logs    = await Logs.find();
        let results = await Results.find();

        return {logs, results, users};
    } catch (err) {
        throw err;
    }

};