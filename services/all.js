/* jshint esversion: 6*/
const Users = require('../models/user'),
    Logs = require('../models/log'),
    Results = require('../models/result'),
    console = require('better-console'),
Q = require('q');

{

    const checkError = (err) => {
        if (err) {
            console.error(err);
        }
    };

    const loadAll = () => {
        let promise = Q.defer();

        let users, logs, results;

        Users.find()
            .then((data)=> {
                users = [...data];
                Logs.find()
                    .then((data)=> {
                        logs = [...data];
                        Results.find()
                            .then((data)=> {
                                results = [...data];
                                promise.resolve(logs,results,users);
                            })
                            .catch((err)=> {
                            promise.reject(err);
                            });
                    })
                    .catch((err)=> {
                        promise.reject(err);
                    });
            })
            .catch((err)=> {
                promise.reject(err);
            });

        return promise.promise;
    };

    module.exports = {
        loadAll,
        checkError
    };

}