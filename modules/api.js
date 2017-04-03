'use strict';
/* jshint esversion: 6 */

const Util = require('../utilities/util'),
    Logs = require('../services/logs'),
    Results = require('../services/results'),
    Users = require('../services/users'),
    Subscribers = require('../services/subscribers'),
    Questions = require('../services/quiz'),
    apiResponse = require('./response').apiResponse;

/**
 *
 * @module api-functions
 */
{
    const setup = (req, res) => {
        Users.remove(() => {
            let nick = {
                name: 'demo',
                email: 'demo@demo.com',
                password: 'password',
                admin: true,
                resultados: []
            };

            Users.saveOne(nick, (err, user) => {
                console.log('User saved: ', user);
                resError(req, res, err);
                Logs.remove(() => apiResponse(req, res, false, 'System initialized correctly', null));
            });
        });
    };

    const findOneLog = (req, res) => Logs.findOne(req.param('id'),
        (err, data) => apiResponse(req, res, err, 'Result', data)
    );

    const findOneUser = (req, res) => Users.findOne(req.param('id'),
        (err, data) => apiResponse(req, res, err, 'Result', data)
    );

    const findAllUsers = (req, res) => Users.find(
        (err, data) => apiResponse(req, res, err, 'All Users', data)
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

    const deleteOneUser = (req, res) => Users.findOne(req.param('id'),
        (err, data) => apiResponse(req, res, null, 'great', null)
    );

    const updateOneUser = (req, res) => resError(req, res, 'not yet implemented');

    const apiWelcome = (req, res) => apiResponse(req, res, false, {
        message: 'Hello from the API!',
        version: '0.0.1',
        contact: 'jesusgonzaleznovez@gmail.com'
    }, null);

    const findAllResultados = (req, res) => Results.find(
        (err, data) => apiResponse(req, res, err, 'All Results', data)
    );

    const saveOneResultado = (req, res) => Results.saveOne(
        (err, data) => apiResponse(req, res, err, 'All Results', data)
    );

    const updateOneResultado = (req, res) => {
        resError(req, res, 'not yet implemented');
    };

    const deleteOneResultado = (req, res) => Results.removeOne(req.param('id'),
        (err, data) => apiResponse(req, res, null, 'great', null)
    );

    const deleteAllResultados = (req, res) => Results.remove(
        () => apiResponse(req, res, null, 'great', null)
    );

    const findOneResultado = (req, res) => Results.findOne(req.param('id'),
        (err, data) => apiResponse(req, res, err, 'Result', data)
    );

    const loadCsv = (req, res) => Util.loadCsv(() =>
        apiResponse(req, res, false, 'CSVs loaded', null)
    );

    const findLogs = (req, res) => Logs.find(
        (err, data) => apiResponse(req, res, err, 'All Logs', data)
    );

    const deleteAllLogs = (req, res) => Logs.remove(
        () => apiResponse(req, res, null, 'great', null)
    );

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

        promises.push(Users.remove(done));
        promises.push(Logs.remove(done));
        promises.push(Results.remove(done));
        promises.push(Subscribers.remove(done));
        promises.push(Questions.remove(done));

        Promise.all(promises).then(endPromises);
    };

    const saveOneQuestion = (req, res) => {
        let q = {
            title: req.body.title,
            correct: req.body.correct,
            answers: JSON.parse(req.body.answers)
        };

        Questions.saveOne(q, (err, data) => resError(req, res, err || true));
    };

    const checkQuestion = (req, res) => {
        resError(req, res, 'not yet implemented');
    };

    const getAllQuestions = (req, res) => Questions.find((err, questions) => {
            if (err) {
                resError(req, res, err);
            } else {
                apiResponse(req, res, null, questions.length + ' Questions loaded', questions);
            }
        }
    );

    const deleteOneQuestion = (req, res) => Questions.removeOne(req.param('id'),
        (err, data) => apiResponse(req, res, null, 'great', null)
    );


    module.exports = {
        /** Generic API response */
        apiResponse,

        /** Generic error response */
        resError,

        /** Initial demo setup */
        setup,

        /** Find all Users */
        findAllUsers,

        /** Saves one user */
        saveOneUser,

        /** Deletes one user */
        deleteOneUser,

        /** Updates one user */
        updateOneUser,

        /** Api welcome function */
        apiWelcome,

        /** Finds all Results */
        findAllResultados,

        /** Saves one result */
        saveOneResultado,

        /** Updates one result */
        updateOneResultado,

        /** Deletes one result */
        deleteOneResultado,

        /** Deletes all Results */
        deleteAllResultados,

        /** Finds one result */
        findOneResultado,

        /** Loads Results in csv format */
        loadCsv,

        /** To find one user */
        findOneUser,

        /** To find one log */
        findOneLog: findOneLog,

        /** To find Logs */
        findLogs,

        /** Delete all Logs */
        deleteAllLogs,

        /** Hard-resets the system, be careful */
        hardReset,

        /** Check if a answer is correct */
        checkQuestion,

        /** Get all Questions */
        getAllQuestions,

        /** Saves one question */
        saveOneQuestion,

        /** Deletes one question */
        deleteOneQuestion
    };
}

