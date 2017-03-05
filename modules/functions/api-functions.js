'use strict';
/* jshint esversion: 6 */

const User = require('../../models/user'),
    Log = require('../../models/log'),
    Result = require('../../models/result'),
    Subscriber = require('../../models/subscriber'),
    Util = require('../util-module'),
    Question = require('../../models/question');

/** All the callback functions of Api routes */
(function () {
    const setup = (req, res) => {
        const initialize = () => {
            let nick = new User({
                name: 'demo',
                email: 'demo@demo.com',
                password: 'password',
                admin: true,
                resultados: []
            });
            nick.save(userSaved);
        };

        User.find({}).remove(initialize);

        const userSaved = (err) => {
            resError(req, res, err);
            Log.find({}).remove(
                () => apiResponse(req, res, false, 'System initialized correctly', null)
            );
        };
    };

    const findOneLog = (req, res) => resError(req, res, 'not yet implemented');

    const findOneUser = (req, res) => resError(req, res, 'not yet implemented');

    const findAllUsers = (req, res) => User.find({},
        (err, data) => apiResponse(req, res, err, 'All users', data)
    );

    const saveOneUser = (req, res) => resError(req, res, 'not yet implemented');

    const resError = (req, res, err) => {
        if (err) {
            res.send({
                result: 'fail',
                success: false,
                message: 'Something went wrong.',
                err: err,
                data: null
            });
        }
    };

    const deleteOneUser = (req, res) => resError(req, res, 'not yet implemented');

    const updateOneUser = (req, res) => resError(req, res, 'not yet implemented');

    const apiWelcome = (req, res) => apiResponse(req, res, false, {
        message: 'Hello from the API!',
        version: '0.0.1',
        contact: 'jesusgonzaleznovez@gmail.com'
    }, null);

    const findAllResultados = (req, res) => Result.find({},
        (err, data) => apiResponse(req, res, err, 'All results', data)
    );

    const saveOneResultado = (req, res) => {
        resError(req, res, 'not yet implemented');
    };

    const updateOneResultado = (req, res) => {
        resError(req, res, 'not yet implemented');
    };

    const deleteOneResultado = (req, res) => {
        resError(req, res, 'not yet implemented');
    };

    const deleteAllResultados = (req, res) => {
        resError(req, res, 'not yet implemented');
    };

    const findOneResultado = (req, res) => Util.getResultadoById(req.param('id'),
        (data) => apiResponse(req, res, false, 'Result', data)
    );

    const loadCsv = (req, res) => Util.loadCsv(() =>
        apiResponse(req, res, false, 'CSVs loaded', null)
    );

    const findLogs = (req, res) => Log.find({},
        (err, data) => apiResponse(req, res, err, 'All logs', data)
    );

    const deleteAllLogs = (req, res) => {
        resError(req, res, null);
    };

    const apiResponse = (req, res, err, message, data) => {
        res.send({
            success: !err,
            message: (err) ? null : message,
            err: (err) ? err : null,
            data: (err) ? null : data
        });
    };

    const hardReset = (req, res) => {
        let promises = [];

        const done = (err) => {
            if (err) {
                resError(req, res, err);
            }
        };

        const endPromises = () => {
            res.send({
                result: 'Successful',
                status: 200,
                err: null
            });
        };

        promises.push(User.remove({}, done));
        promises.push(Log.remove({}, done));
        promises.push(Result.remove({}, done));
        promises.push(Subscriber.remove({}, done));

        Promise.all(promises).then(endPromises);
    };

    const saveOneQuestion = (req, res) => {
        let q = new Question({
            title: req.body.title,
            correct: req.body.correct,
            answers: JSON.parse(req.body.answers)
        });
        q.save((err) => {
            resError(req, res, err || true);
        });
    };

    const checkQuestion = (req, res) => {
        resError(req, res, 'not yet implemented');
    };

    const getAllQuestions = (req, res) => {
        Question.find({}, (err, questions) => {
                if (err) {
                    resError(req, res, err);
                } else {
                    apiResponse(req, res, null, questions.length + ' questions loaded', questions);
                }
            }
        );
    };

    const deleteOneQuestion = (req, res) => {
        Question.findByIdAndRemove({_id: req.param('id')},(err,data) => apiResponse(req, res, null, 'great', null));
    };

    module.exports = {
        /** Generic API response */
        apiResponse: apiResponse,

        /** Generic error response */
        resError: resError,

        /** Initial demo setup */
        setup: setup,

        /** Find all users */
        findAllUsers: findAllUsers,

        /** Saves one user */
        saveOneUser: saveOneUser,

        /** Deletes one user */
        deleteOneUser: deleteOneUser,

        /** Updates one user */
        updateOneUser: updateOneUser,

        /** Api welcome function */
        apiWelcome: apiWelcome,

        /** Finds all results */
        findAllResultados: findAllResultados,

        /** Saves one result */
        saveOneResultado: saveOneResultado,

        /** Updates one result */
        updateOneResultado: updateOneResultado,

        /** Deletes one result */
        deleteOneResultado: deleteOneResultado,

        /** Deletes all results */
        deleteAllResultados: deleteAllResultados,

        /** Finds one result */
        findOneResultado: findOneResultado,

        /** Loads results in csv format */
        loadCsv: loadCsv,

        /** To find one user */
        findOneUser: findOneUser,

        /** To find one log */
        findOneLog: findOneLog,

        /** To find logs */
        findLogs: findLogs,

        /** Delete all logs */
        deleteAllLogs: deleteAllLogs,

        /** Hard-resets the system, be careful */
        hardReset: hardReset,

        checkQuestion: checkQuestion,

        getAllQuestions: getAllQuestions,

        saveOneQuestion: saveOneQuestion,

        deleteOneQuestion: deleteOneQuestion
    };
})();

