class ErrorHandler {
    static catchNotFound(req, res, next) {
        let err = new Error('Not Found');
        err.status = 404;
        next(err);
    }

    static developmentHandler(err, req, res, next) {
        res.status(err.status || 500);
        res.render('pages/misc/error', {
            message: err.message,
            err: err,
            user: req.user
        });
    }

    static productionHandler(err, req, res, next) {
        res.status(err.status || 500);
        res.render('pages/misc/error', {
            message: err.message,
            err: {},
            user: req.user
        });
    }
}
module.exports = ErrorHandler;
