/* jshint esversion: 6 */
const Log = require('../models/log');

{
    const findOne = (id,done) => {
        Log.findOne({_id: id},
            (err, data) => done(err,data)
        );
    };

    const find = (done) => {
        Log.find({},
            (err, data) => done(err,data)
        );
    };

    const remove = (done) => {
        Log.find({}).remove(
            () => done()
        );
    };

    const save = (log,done) => {
        let l = new Log(log);
        l.save((err) => {
            done(err);
        });
        
    };

    module.exports = {
        findOne,
        find,
        remove,
        save
    };

}