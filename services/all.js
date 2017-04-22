/* jshint esversion: 6*/
const Users = require('../models/user'),
    Logs = require('../models/log'),
    Results = require('../models/result'),
    console = require('better-console');

{

    const checkError = (err) => {
        if (err) {
            console.error(err);
        }
    };

    const loadAll = (done) => {
        let promises = [], users, logs, results;

        const userCallback = (err, data) => {
            checkError(err);
            users = [...data];
        };

        const logCallback = (err, data) => {
            checkError(err);
            logs = [...data];
        };

        const resultCallback = (err, data) => {
            checkError(err);
            results = [...data];
        };

        promises.push(Users.find(userCallback));
        promises.push(Logs.find(logCallback));
        promises.push(Results.find(resultCallback));

        Promise.all(promises)
            .then(() => {
                done(logs, results, users);
            });
    };

    module.exports = {
        loadAll,
        checkError
    };

}