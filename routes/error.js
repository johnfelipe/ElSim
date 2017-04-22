/* jshint esversion: 6 */
{
    const sendError = (req,res,err) =>  {
        console.error(err);
        res.render('pages/misc/error', {
            result: 'fail',
            message: err,
            err: {
                message: err,
                status: 401
            }
        });
    };

    module.exports = {
        sendError
    };
}
