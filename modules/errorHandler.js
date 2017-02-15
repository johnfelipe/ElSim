/* jshint esversion: 6 */
'use strict';

(function () {
    /** Catch 404 and forward to error handler */
    const catchNotFound = (req, res, next) => {
        let err = new Error('Not Found');
        err.status = 404;
        next(err);
    };

    /** Development error handler will print stacktrace */
    const developmentHandler = (err, req, res, next) => {
        res.status(err.status || 500);
        res.render('pages/misc/error', {
            message: err.message,
            err: err
        });
    };

    /** Production error handler, no stacktraces leaked to user */
    const productionHandler = (err, req, res, next) => {
        res.status(err.status || 500);
        res.render('pages/misc/error', {
            message: err.message,
            err: {}
        });
    };

    module.exports = {
        catchNotFound: catchNotFound,
        developmentHandler: developmentHandler,
        productionHandler: productionHandler
    };
})();
