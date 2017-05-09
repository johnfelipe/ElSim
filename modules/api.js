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

    const setup = (req, res) => {

        const errorHandler = (err) => resError(req, res, err);

        const userSaved = (user) => {
            console.log('User saved: ', user);

            errorHandler(null);

            Logs.remove()
                .then(() => apiResponse(req, res, null, 'System initialized correctly', null))
                .catch((err) => apiResponse(req, res, err, 'System initialized correctly', null));
        };

        const userRemoved = () => {
            let nick = {
                name: 'demo',
                email: 'demo@demo.com',
                password: 'password',
                admin: true,
                resultados: []
            };

            Users.saveOne(nick)
                .then(userSaved)
                .catch(errorHandler);
        };

        Users.remove()
            .then(userRemoved)
            .catch(errorHandler);
    };

    const findOneLog = (req, res) => {
        Logs.findOne(req.param('id'))
            .then((data) => apiResponse(req, res, null, 'Result', data))
            .catch((err) => apiResponse(req, res, err, 'Result', null));
    };

    const findOneUser = (req, res) => {
        Users.findOne(req.param('id'))
            .then((data) => apiResponse(req, res, null, 'Result', data))
            .catch((err) => apiResponse(req, res, err, 'Result', null));
    };

    const findAllUsers = (req, res) => {
        Users.find()
            .then((data) => apiResponse(req, res, null, 'All Users', data))
            .catch((err) => apiResponse(req, res, err, 'All Users', null));
    };

    const saveOneUser = (req, res) => {
        resError(req, res, 'not yet implemented');
    };

    const deleteOneUser = (req, res) => {
        Users.removeOne(req.param('id'))
            .then((data) => apiResponse(req, res, null, 'great', null))
            .catch((err) => apiResponse(req, res, err, 'great', null));
    };

    const updateOneUser = (req, res) => {
        resError(req, res, 'not yet implemented');
    };

    const apiWelcome = (req, res) => {
        apiResponse(req, res, null, {
            message: 'Hello from the API!',
            version: '0.0.1',
            contact: 'jesusgonzaleznovez@gmail.com'
        }, null);
    };

    const findAllResultados = (req, res) => {
        Results.find()
            .then((data) => apiResponse(req, res, null, 'All Results', data))
            .catch((err) => apiResponse(req, res, err, 'All Results', null));
    };

    const saveOneResultado = (req, res) => {
        Results.saveOne()
            .then((data) => apiResponse(req, res, null, 'All Results', data))
            .catch((err) => apiResponse(req, res, err, 'All Results', null));
    };

    const updateOneResultado = (req, res) => {
        resError(req, res, 'not yet implemented');
    };

    const deleteOneResultado = (req, res) => {
        Results.removeOne(req.param('id'))
            .then((data) => apiResponse(req, res, null, 'great', null))
            .catch((err) => apiResponse(req, res, err, 'great', null));
    };

    const deleteAllResultados = (req, res) => {
        Results.remove()
            .then(() => apiResponse(req, res, null, 'great', null))
            .catch((err) => apiResponse(req, res, err, 'great', null));
    };

    const findOneResultado = (req, res) => {
        Results.findOne(req.param('id'))
            .then((data) => apiResponse(req, res, null, 'Result', data))
            .catch((err) => apiResponse(req, res, err, 'Result', null));
    };

    const loadCsv = (req, res) => {
        Util.loadCsv()
            .then(() => apiResponse(req, res, null, 'CSVs loaded', null))
            .catch((err) => apiResponse(req, res, err, 'Result', null));
    };

    const findLogs = (req, res) => {
        Logs.find()
            .then((data) => apiResponse(req, res, null, 'All Logs', data))
            .catch((err) => apiResponse(req, res, err, 'All Logs', null));
    };

    const deleteAllLogs = (req, res) => {
        Logs.remove()
            .then(() => apiResponse(req, res, null, 'great', null))
            .catch((err) => apiResponse(req, res, err, 'great', null));
    };

    const hardReset = (req, res) => {
        let promises = [];

        promises.push(Users.remove());
        promises.push(Logs.remove());
        promises.push(Results.remove());
        promises.push(Subscribers.remove());
        promises.push(Questions.remove());

        Promise.all(promises)
            .then(() => res.send({
                result: 'Successful',
                status: 200,
                err: null
            }))
            .catch((err) => resError(req, res, err));
    };

    const saveOneQuestion = (req, res) => {
        let q = {
            title: req.body.title,
            correct: req.body.correct,
            answers: JSON.parse(req.body.answers)
        };

        Questions.saveOne(q)
            .then((data) => resError(req, res, true))
            .catch((err) => resError(req, res, err));
    };

    const checkQuestion = (req, res) => {
        resError(req, res, 'not yet implemented');
    };

    const getAllQuestions = (req, res) => {
        Questions.find()
            .then((questions) => apiResponse(req, res, null, questions.length + ' Questions loaded', questions))
            .catch((err) => resError(req, res, err));
    };

    const deleteOneQuestion = (req, res) => {
        Questions.removeOne(req.param('id'))
            .then((data) => apiResponse(req, res, null, 'great', null))
            .catch((err) => apiResponse(req, res, err, 'fail', null));
    };


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

