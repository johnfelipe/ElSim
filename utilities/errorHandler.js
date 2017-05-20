/* jshint esversion: 6 */

class ErrorHandler {
    constructor() {

    }

    static catchNotFound(req, res, next) {
        let err = new Error('Not Found');
        err.status = 404;
        next(err);
    }

    static developmentHandler(err, req, res, next) {
        res.status(err.status || 500);
        res.render('pages/misc/error', {
            message: err.message,
            err: err
        });
    }


    static productionHandler(err, req, res, next) {
        res.status(err.status || 500);
        res.render('pages/misc/error', {
            message: err.message,
            err: {}
        });
    }
}
module.exports = ErrorHandler;
