const Q = require('q');
const LogService = require('../services/logs');
const QuizService = require('../services/quiz');
const ResultService = require('../services/results');
const SubscriberService = require('../services/subscribers');
const UserService = require('../services/users');

class HardReset{
    constructor(){

    }

    static hardReset() {
        let promise = Q.defer();

        LogService.remove()
            .then(QuizService.remove)
            .then(ResultService.remove)
            .then(SubscriberService.remove)
            .then(UserService.remove)
            .then(() => promise.resolve())
            .catch((err) => promise.reject(err));

        return promise.promise;
    }
}
module.exports = HardReset;
