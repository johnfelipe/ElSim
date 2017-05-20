'use strict';
/* jshint esversion: 6 */

const Util = require('../utilities/util'),
    Logs = require('../services/logs'),
    Results = require('../services/results'),
    Users = require('../services/users'),
    Subscribers = require('../services/subscribers'),
    Questions = require('../services/quiz'),
    apiResponse = require('./response').apiResponse;

class ApiHandler {
    constructor() {

    }

    static resError(req, res, err) {
        if (err) {
            res.send({
                result: 'fail',
                success: false,
                message: 'Something went wrong.',
                err: err,
                data: null
            });
        }
    }

    static setup(req, res) {

        const errorHandler = (err) => ApiHandler.resError(req, res, err);

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
    }

    static findOneLog(req, res) {
        Logs.findOne(req.params.id)
            .then((data) => apiResponse(req, res, null, 'Result', data))
            .catch((err) => apiResponse(req, res, err, 'Result', null));
    }

    static findOneUser(req, res) {
        Users.findOne(req.params.id)
            .then((data) => apiResponse(req, res, null, 'Result', data))
            .catch((err) => apiResponse(req, res, err, 'Result', null));
    }

    static findAllUsers(req, res) {
        Users.find()
            .then((data) => apiResponse(req, res, null, 'All Users', data))
            .catch((err) => apiResponse(req, res, err, 'All Users', null));
    }

    static saveOneUser(req, res) {
        ApiHandler.resError(req, res, 'not yet implemented');
    }

    static deleteOneUser(req, res) {
        Users.removeOne(req.params.id)
            .then((data) => apiResponse(req, res, null, 'great', null))
            .catch((err) => apiResponse(req, res, err, 'great', null));
    }

    static updateOneUser(req, res) {
        ApiHandler.resError(req, res, 'not yet implemented');
    }

    static apiWelcome(req, res) {
        apiResponse(req, res, null, {
            message: 'Hello from the API!',
            version: '0.0.1',
            contact: 'jesusgonzaleznovez@gmail.com'
        }, null);
    }

    static findAllResultados(req, res) {
        Results.find()
            .then((data) => apiResponse(req, res, null, 'All Results', data))
            .catch((err) => apiResponse(req, res, err, 'All Results', null));
    }

    static saveOneResultado(req, res) {
        Results.saveOne()
            .then((data) => apiResponse(req, res, null, 'All Results', data))
            .catch((err) => apiResponse(req, res, err, 'All Results', null));
    }

    static updateOneResultado(req, res) {
        ApiHandler.resError(req, res, 'not yet implemented');
    }

    static deleteOneResultado(req, res) {
        Results.removeOne(req.params.id)
            .then((data) => apiResponse(req, res, null, 'great', null))
            .catch((err) => apiResponse(req, res, err, 'great', null));
    }

    static deleteAllResultados(req, res) {
        Results.remove()
            .then(() => apiResponse(req, res, null, 'great', null))
            .catch((err) => apiResponse(req, res, err, 'great', null));
    }

    static findOneResultado(req, res) {
        Results.findOne(req.params.id)
            .then((data) => apiResponse(req, res, null, 'Result', data))
            .catch((err) => apiResponse(req, res, err, 'Result', null));
    }

    static loadCsv(req, res) {
        Util.loadCsv()
            .then(() => apiResponse(req, res, null, 'CSVs loaded', null))
            .catch((err) => apiResponse(req, res, err, 'Result', null));
    }

    static findLogs(req, res) {
        Logs.find()
            .then((data) => apiResponse(req, res, null, 'All Logs', data))
            .catch((err) => apiResponse(req, res, err, 'All Logs', null));
    }

    static deleteAllLogs(req, res) {
        Logs.remove()
            .then(() => apiResponse(req, res, null, 'great', null))
            .catch((err) => apiResponse(req, res, err, 'great', null));
    }

    static hardReset(req, res) {
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
            .catch((err) => ApiHandler.resError(req, res, err));
    }

    static saveOneQuestion(req, res) {
        let q = {
            title: req.body.title,
            correct: req.body.correct,
            answers: JSON.parse(req.body.answers)
        };

        Questions.saveOne(q)
            .then((data) => ApiHandler.resError(req, res, true))
            .catch((err) => ApiHandler.resError(req, res, err));
    }

    static checkQuestion(req, res) {
        return ApiHandler.resError(req, res, 'not yet implemented');
    }

    static getAllQuestions(req, res) {
        Questions.find()
            .then((questions) => apiResponse(req, res, null, questions.length + ' Questions loaded', questions))
            .catch((err) => ApiHandler.resError(req, res, err));
    }

    static deleteOneQuestion(req, res) {
        Questions.removeOne(req.params.id)
            .then((data) => apiResponse(req, res, null, 'great', null))
            .catch((err) => apiResponse(req, res, err, 'fail', null));
    }
}
module.exports = ApiHandler;

