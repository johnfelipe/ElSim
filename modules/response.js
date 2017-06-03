/** Manages typical responses situations. */
class Response {
    /**
     *
     * @param req
     * @param res
     * @param page
     * @param title
     * @param other
     */
    static response(req, res, page, title, other) {
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
    }

    /**
     *
     * @param req
     * @param res
     * @param err
     * @param message
     * @param data
     */
    static apiResponse(req, res, err, message, data) {
        res.send({
            success: !err,
            message: (err) ? null : message,
            err: (err) ? err : null,
            data: (err) ? null : data
        });
    }
}
module.exports = Response;

