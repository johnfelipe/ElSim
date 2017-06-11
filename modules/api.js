const Logs = require('../services/logs');
const Results = require('../services/results');
const Users = require('../services/users');
const Questions = require('../services/quiz');
const apiResponse = require('./response').apiResponse;
const Chart = require('../charts/chart');
const Comparator = require('../modules/comparator');
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
            .catch((err) => ApiHandler.resError(req, res, err));
    }

    /**
     *
     * @param req
     * @param res
     */
    static findOneUser(req, res) {
        Users.findOne(req.params.id)
            .then((data) => apiResponse(req, res, null, 'Result', data))
            .catch((err) => ApiHandler.resError(req, res, err));
    }

    /**
     *
     * @param req
     * @param res
     */
    static findAllUsers(req, res) {
        Users.find()
            .then((data) => apiResponse(req, res, null, 'All Users', data))
            .catch((err) => ApiHandler.resError(req, res, err));
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
        Users.removeOne(req.body.id)
            .then((data) => apiResponse(req, res, null, 'great', null))
            .catch((err) => ApiHandler.resError(req, res, err));
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
            .catch((err) => ApiHandler.resError(req, res, err));
    }

    /**
     *
     * @param req
     * @param res
     */
    static saveOneResultado(req, res) {
        let r = {
            "eleccion": JSON.parse(req.body.eleccion),
            "comunidad": req.body.comunidad,
            "cod_provincia": req.body.cod_provincia,
            "provincia": req.body.provincia,
            "poblacion": req.body.poblacion,
            "total_votantes": req.body.total_votantes,
            "votos_validos": req.body.votos_validos,
            "votos_candidaturas": req.body.votos_candidaturas,
            "votos_blanco": req.body.votos_blanco,
            "votos_nulos": req.body.votos_nulos,
            "partidos": JSON.parse(req.body.partidos)
        };
        Results.saveOne(r)
            .then((data) => apiResponse(req, res, null, 'result saved', data))
            .catch((err) => ApiHandler.resError(req, res, err));
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
        Results.removeOne(req.body.id)
            .then((data) => apiResponse(req, res, null, 'great', null))
            .catch((err) => ApiHandler.resError(req, res, err));
    }

    /**
     *
     * @param req
     * @param res
     */
    static deleteAllResultados(req, res) {
        ApiHandler.resError(req, res, 'Only admin can do this');
        /*Results.remove()
         .then(() => apiResponse(req, res, null, 'great', null))
         .catch((err) => ApiHandler.resError(req, res, err));*/
    }

    /**
     *
     * @param req
     * @param res
     */
    static findOneResultado(req, res) {
        Results.findOne(req.params.id)
            .then((data) => apiResponse(req, res, null, 'Result', data))
            .catch((err) => ApiHandler.resError(req, res, err));
    }

    /**
     *
     * @param req
     * @param res
     */
    static findLogs(req, res) {
        Logs.find()
            .then((data) => apiResponse(req, res, null, 'All Logs', data))
            .catch((err) => ApiHandler.resError(req, res, err));
    }

    /**
     *
     * @param req
     * @param res
     */
    static deleteAllLogs(req, res) {
        Logs.remove()
            .then(() => apiResponse(req, res, null, 'great', null))
            .catch((err) => ApiHandler.resError(req, res, err));
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
            .then((data) => apiResponse(req, res, null, 'question saved', null))
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
        Questions.removeOne(req.body.id)
            .then((data) => apiResponse(req, res, null, 'great', null))
            .catch((err) => ApiHandler.resError(req, res, err));
    }

    static compare(req, res) {

        console.info('GET '.yellow + '/compare-country-form');

        if (typeof req.body.resultSelected === 'undefined' ||
            typeof req.body.percentage === 'undefined' ||
            typeof req.body.percentage1 === 'undefined') {
            ApiHandler.resError(req, res, 'Parameters error');
            return;
        }

        let resultSelected = req.body.resultSelected;
        let percentage1 = req.body.percentage1;
        let percentage2 = req.body.percentage;
        let user = req.user;

        let comparator = new Comparator(req.body);

        comparator.fillSets();

        const agrupaGlobal = (conjunto) => {
            let parties = {};
            let communities = Object.keys(conjunto);
            for (let community of communities) {
                let partiesKeys = Object.keys(conjunto[community].resultadoFinal.parties);
                for (let party of partiesKeys) {
                    if (typeof parties[party] === 'undefined') {
                        parties[party] = conjunto[community].resultadoFinal.parties[party];
                    } else {
                        parties[party] += conjunto[community].resultadoFinal.parties[party];
                    }
                }
            }
            return parties;
        };

        let options1, options2;

        const cleanSet = (set) => {
            let keys = Object.keys(set);
            for (let key of keys) {
                if (set[key] === 0) {
                    delete set[key];
                }
            }
        };

        const handleSecondResult = (o) => {
            options2 = o;
            if (typeof comparator.set1.communities !== 'undefined') {
                options1.global.agrupado = agrupaGlobal(options1.global.agrupado);
            }
            if (typeof comparator.set2.communities !== 'undefined') {
                options2.global.agrupado = agrupaGlobal(options2.global.agrupado);
            }

            cleanSet(options1.global.agrupado);
            cleanSet(options2.global.agrupado);

            comparator.fillDifferences(
                options1.global.agrupado,
                options2.global.agrupado,
                percentage1,
                percentage2
            );

            let differences = comparator.differences;

            let options = {
                differences,
                firstResult: options1.global,
                secondResult: options2.global
            };

            if (typeof options.differences.results === 'undefined') {
                options.differences.results = [];
            }

            apiResponse(req, res, null, 'Comparation', options);
        };

        const handleFirstResult = (o) => {
            options1 = o;
            return Chart.calculateCountry(resultSelected, percentage2, user, comparator.set2);
        };

        Chart.calculateCountry(resultSelected, percentage1, user, comparator.set1)
            .then(handleFirstResult)
            .then(handleSecondResult)
            .catch((err) => ApiHandler.resError(req, res, err));
    }

    static country(req, res) {
        if (typeof req.body.resultSelected === 'undefined' ||
            typeof req.body.percentage === 'undefined') {
            ApiHandler.resError(req, res, 'Parameters error');
            return;
        }

        let resultSelected = req.body.resultSelected;
        let percentage = req.body.percentage;
        let user = req.user;
        let body = req.body;

        Chart.calculateCountry(resultSelected, percentage, user, body)
            .then((options) => {
                delete options.title;
                apiResponse(req, res, null, 'Country Simulation', options);
            })
            .catch((err) => {
                console.error(err);
                ApiHandler.resError(req, res, err);
            });
    }

    static district(req, res) {
        if (typeof req.body.mode === 'undefined' ||
            typeof req.body.mandates === 'undefined' ||
            typeof req.body.percentage === 'undefined' ||
            typeof req.body.resultSelected === 'undefined') {
            ApiHandler.resError(req, res, 'Parameters error');
            return;
        }

        let mode = req.body.mode,
            mandates = req.body.mandates,
            percentage = req.body.percentage,
            resultSelected = req.body.resultSelected,
            user = req.user;

        Chart.calculateDistrict(mode, mandates, percentage, resultSelected, user)
            .then((options) => {
                delete options.options;
                delete options.icons;
                delete options.result.table;
                delete options.title;
                apiResponse(req, res, null, 'District', options);
            })
            .catch((err) => ApiHandler.resError(req, res, err));
    }

    static districtChart(req, res) {
        if (typeof req.body.mode === 'undefined' ||
            typeof req.body.mandates === 'undefined' ||
            typeof req.body.percentage === 'undefined' ||
            typeof req.body.resultSelected === 'undefined') {
            ApiHandler.resError(req, res, 'Parameters error');
            return;
        }

        let mode = req.body.mode;
        let mandates = req.body.mandates;
        let percentage = req.body.percentage;
        let resultSelected = req.body.resultSelected;
        let user = req.user;

        Chart.calculateDistrict(mode, mandates, percentage, resultSelected, user)
            .then((options) => {
                apiResponse(req, res, null, 'District Chart', options.options);
            })
            .catch((err) => ApiHandler.resError(req, res, err));
    }
}
module.exports = ApiHandler;

