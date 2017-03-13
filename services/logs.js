/* jshint esversion: 6 */
const Log = require('../models/log');

(function(){
    const findOne = (id,done) => Log.findOne({_id: id},
        (err, data) => done(err,data)
    );

    const find = (done) => Log.find({},
        (err, data) => done(err,data)
    );

    const remove = (done) => Log.find({}).remove(
        () => done()
    );

    module.exports = {
        findOne: findOne,
        find: find,
        remove: remove
    };

})();