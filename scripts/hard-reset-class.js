const Log               = require('../services/logs');
const QuizService       = require('../services/quiz');
const ResultService     = require('../services/results');
const SubscriberService = require('../services/subscribers');
const UserService       = require('../services/users');

/** Utility to hard reset the system. */
class HardReset {
    static async hardReset() {
        try {
            await Log.remove();
            await QuizService.remove();
            await ResultService.remove();
            await SubscriberService();
            await UserService.remove();

            return 0;
        } catch (err) {
            throw err;
        }
    }
}
module.exports = HardReset;