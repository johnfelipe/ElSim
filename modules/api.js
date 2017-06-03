const Logs = require('../services/logs');
const Results = require('../services/results');
const Users = require('../services/users');
const Questions = require('../services/quiz');
const apiResponse = require('./response').apiResponse;

/** Handle all API's requests. */
class ApiHandler {
    /**
     *
     * @param req
     * @param res
     * @param err
     */
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

    /**
     *
     * @param req
     * @param res
     */
    static findOneLog(req, res) {
        Logs.findOne(req.params.id)
            .then((data) => apiResponse(req, res, null, 'Result', data))
            .catch((err) => apiResponse(req, res, err, 'Result', null));
    }

    /**
     *
     * @param req
     * @param res
     */
    static findOneUser(req, res) {
        Users.findOne(req.params.id)
            .then((data) => apiResponse(req, res, null, 'Result', data))
            .catch((err) => apiResponse(req, res, err, 'Result', null));
    }

    /**
     *
     * @param req
     * @param res
     */
    static findAllUsers(req, res) {
        Users.find()
            .then((data) => apiResponse(req, res, null, 'All Users', data))
            .catch((err) => apiResponse(req, res, err, 'All Users', null));
    }

    /**
     *
     * @param req
     * @param res
     */
    static saveOneUser(req, res) {
        ApiHandler.resError(req, res, 'not yet implemented');
    }

    /**
     *
     * @param req
     * @param res
     */
    static deleteOneUser(req, res) {
        Users.removeOne(req.params.id)
            .then((data) => apiResponse(req, res, null, 'great', null))
            .catch((err) => apiResponse(req, res, err, 'great', null));
    }

    /**
     *
     * @param req
     * @param res
     */
    static updateOneUser(req, res) {
        ApiHandler.resError(req, res, 'not yet implemented');
    }

    /**
     *
     * @param req
     * @param res
     */
    static apiWelcome(req, res) {
        apiResponse(req, res, null, {
            message: 'Hello from the API!',
            version: '0.0.1',
            contact: 'jesusgonzaleznovez@gmail.com'
        }, null);
    }

    /**
     *
     * @param req
     * @param res
     */
    static findAllResultados(req, res) {
        Results.find()
            .then((data) => apiResponse(req, res, null, 'All Results', data))
            .catch((err) => apiResponse(req, res, err, 'All Results', null));
    }

    /**
     *
     * @param req
     * @param res
     */
    static saveOneResultado(req, res) {
        Results.saveOne()
            .then((data) => apiResponse(req, res, null, 'All Results', data))
            .catch((err) => apiResponse(req, res, err, 'All Results', null));
    }

    /**
     *
     * @param req
     * @param res
     */
    static updateOneResultado(req, res) {
        ApiHandler.resError(req, res, 'not yet implemented');
    }

    /**
     *
     * @param req
     * @param res
     */
    static deleteOneResultado(req, res) {
        Results.removeOne(req.params.id)
            .then((data) => apiResponse(req, res, null, 'great', null))
            .catch((err) => apiResponse(req, res, err, 'great', null));
    }

    /**
     *
     * @param req
     * @param res
     */
    static deleteAllResultados(req, res) {
        Results.remove()
            .then(() => apiResponse(req, res, null, 'great', null))
            .catch((err) => apiResponse(req, res, err, 'great', null));
    }

    /**
     *
     * @param req
     * @param res
     */
    static findOneResultado(req, res) {
        Results.findOne(req.params.id)
            .then((data) => apiResponse(req, res, null, 'Result', data))
            .catch((err) => apiResponse(req, res, err, 'Result', null));
    }

    /**
     *
     * @param req
     * @param res
     */
    static findLogs(req, res) {
        Logs.find()
            .then((data) => apiResponse(req, res, null, 'All Logs', data))
            .catch((err) => apiResponse(req, res, err, 'All Logs', null));
    }

    /**
     *
     * @param req
     * @param res
     */
    static deleteAllLogs(req, res) {
        Logs.remove()
            .then(() => apiResponse(req, res, null, 'great', null))
            .catch((err) => apiResponse(req, res, err, 'great', null));
    }

    /**
     *
     * @param req
     * @param res
     */
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

    /**
     *
     * @param req
     * @param res
     */
    static checkQuestion(req, res) {
        return ApiHandler.resError(req, res, 'not yet implemented');
    }

    /**
     *
     * @param req
     * @param res
     */
    static getAllQuestions(req, res) {
        Questions.find()
            .then((questions) => apiResponse(req, res, null, questions.length + ' Questions loaded', questions))
            .catch((err) => ApiHandler.resError(req, res, err));
    }

    /**
     *
     * @param req
     * @param res
     */
    static deleteOneQuestion(req, res) {
        Questions.removeOne(req.params.id)
            .then((data) => apiResponse(req, res, null, 'great', null))
            .catch((err) => apiResponse(req, res, err, 'fail', null));
    }
}
module.exports = ApiHandler;

