/* jshint esversion: 6 */
'use strict';

(function () {

    const catchNotFound = (req, res, next) => {
        let err = new Error('Not Found');
        err.status = 404;
        next(err);
    };


    const developmentHandler = (err, req, res, next) => {
        res.status(err.status || 500);
        res.render('pages/misc/error', {
            message: err.message,
            err: err
        });
    };


    const productionHandler = (err, req, res, next) => {
        res.status(err.status || 500);
        res.render('pages/misc/error', {
            message: err.message,
            err: {}
        });
    };

    /**
     *
     * @module errorHandler
     */
    module.exports = {
        /** Catch 404 and forward to error handler */
        catchNotFound: catchNotFound,

        /** Development error handler will print stacktrace */
        developmentHandler: developmentHandler,

        /** Production error handler, no stacktraces leaked to user */
        productionHandler: productionHandler
    };
})();
