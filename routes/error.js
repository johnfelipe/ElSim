const LogService = require('../services/logs');

class ErrorSender {
    static sendError(req, res, err) {
        LogService.save({
            message: (typeof err === 'string') ? err : JSON.stringify(err, null, 2),
            date   : new Date()
        })
            .then(() => res.render('pages/misc/error', {
                result : 'fail',
                message: err,
                err    : {
                    message: err,
                    status : 401
                },
                user   : req.user
            }))
            .catch((error) => {
                console.error('Unexpected error saving log...');
                console.error(error);
                console.error('Throwing error...');
                throw error;
            });
    }
}
module.exports = ErrorSender;
