const Q                 = require('q');
const Log               = require('../services/logs');
const QuizService       = require('../services/quiz');
const ResultService     = require('../services/results');
const SubscriberService = require('../services/subscribers');
const UserService       = require('../services/users');

/** Utility to hard reset the system. */
class HardReset {
    static async hardReset() {
        let promise = Q.defer();

        try {
            await Log.remove();
            await QuizService.remove();
            await ResultService.remove();
            await SubscriberService.remove();
            await UserService.remove();

            promise.resolve();
        } catch (err) {
            promise.reject(err);
        }

        return promise.promise;
    }
}
module.exports = HardReset;