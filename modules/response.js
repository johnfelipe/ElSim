/* jshint esversion: 6 */
'use strict';

/**
 *
 * @module response
 */
{
    const response = (req, res, page, title, other) => {
        let options = {
            title: title,
            user: req.user
        };
        let merged;

        if (other) {
            merged = Object.assign(options, other);
        } else {
            merged = options;
        }

        res.render(page, merged);
    };

    const apiResponse = (req, res, err, message, data) => {
        res.send({
            success: !err,
            message: (err) ? null : message,
            err: (err) ? err : null,
            data: (err) ? null : data
        });
    }

    module.exports = {
        response,
        apiResponse
    };
}

