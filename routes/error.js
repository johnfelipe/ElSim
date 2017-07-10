const LogService = require('../services/logs');

class ErrorSender {
    static async sendError(req, res, err) {
        try {
            await LogService.save({
                message: (typeof err === 'string') ? err : JSON.stringify(err, null, 2),
                date   : new Date()
            });

            res.render('pages/misc/error', {
                result : 'fail',
                message: err,
                err    : {
                    message: err,
                    status : 401
                },
                user   : req.user
            });
        } catch (error) {
            console.error('Unexpected error saving log...');
            console.error(error);
            console.error('Throwing error...');
            throw error;
        }
    }
}
module.exports = ErrorSender;
