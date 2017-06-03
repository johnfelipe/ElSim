const Q = require('q');
const Log = require('../services/logs');
const QuizService = require('../services/quiz');
const ResultService = require('../services/results');
const SubscriberService = require('../services/subscribers');
const UserService = require('../services/users');

/** Utility to hard reset the system. */
class HardReset {
    /**
     *
     * @return {*}
     */
    static hardReset() {
        let promise = Q.defer();

        Log.remove()
            .then(QuizService.remove)
            .then(ResultService.remove)
            .then(SubscriberService.remove)
            .then(UserService.remove)
            .then(promise.resolve)
            .catch(promise.reject);

        return promise.promise;
    }
}
module.exports = HardReset;