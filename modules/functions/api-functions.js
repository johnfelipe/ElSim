'use strict';
/* jshint esversion: 6 */

const User = require('../../models/user'),
    Log = require('../../models/log'),
    Result = require('../../models/result'),
    Subscriber = require('../../models/subscriber'),
    Util = require('../util-module'),
    Question = require('../../models/question');

/**
 *
 * @module api-functions
 */
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

    const findOneLog = (req, res) => Log.findOne({_id: req.param('id')},
        (err, data) => apiResponse(req, res, err, 'Result', data)
    );

    const findOneUser = (req, res) => User.findOne({_id: req.param('id')},
        (err, data) => apiResponse(req, res, err, 'Result', data)
    );

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

    const deleteOneUser = (req, res) => User.findByIdAndRemove({_id: req.param('id')},
        (err, data) => apiResponse(req, res, null, 'great', null)
    );

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

    const deleteOneResultado = (req, res) => Result.findByIdAndRemove({_id: req.param('id')},
        (err, data) => apiResponse(req, res, null, 'great', null)
    );

    const deleteAllResultados = (req, res) => Result.find({}).remove(
        () => apiResponse(req, res, null, 'great', null)
    );

    const findOneResultado = (req, res) => Result.findOne({_id: req.param('id')},
        (err, data) => apiResponse(req, res, err, 'Result', data)
    );

    const loadCsv = (req, res) => Util.loadCsv(() =>
        apiResponse(req, res, false, 'CSVs loaded', null)
    );

    const findLogs = (req, res) => Log.find({},
        (err, data) => apiResponse(req, res, err, 'All logs', data)
    );

    const deleteAllLogs = (req, res) => Log.find({}).remove(
        () => apiResponse(req, res, null, 'great', null)
    );

    const apiResponse = (req, res, err, message, data) => res.send({
        success: !err,
        message: (err) ? null : message,
        err: (err) ? err : null,
        data: (err) ? null : data
    });


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

        promises.push(User.find({}).remove(done));
        promises.push(Log.find({}).remove(done));
        promises.push(Result.find({}).remove(done));
        promises.push(Subscriber.find({}).remove(done));
        promises.push(Question.find({}).remove(done));

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

    const getAllQuestions = (req, res) => Question.find({}, (err, questions) => {
            if (err) {
                resError(req, res, err);
            } else {
                apiResponse(req, res, null, questions.length + ' questions loaded', questions);
            }
        }
    );

    const deleteOneQuestion = (req, res) => Question.findByIdAndRemove({_id: req.param('id')},
        (err, data) => apiResponse(req, res, null, 'great', null)
    );


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

        /** Check if a answer is correct */
        checkQuestion: checkQuestion,

        /** Get all questions */
        getAllQuestions: getAllQuestions,

        /** Saves one question */
        saveOneQuestion: saveOneQuestion,

        /** Deletes one question */
        deleteOneQuestion: deleteOneQuestion
    };
})();

