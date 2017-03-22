/* jshint esversion: 6 */
const Result = require('../models/result');

{

    const find = (done) => Result.find({}, (err, data) => done(err, data));

    const saveOne = (done) => done(new Error('not yet implemented', null));


    const updateOne = (done) => done(new Error('not yet implemented', null));


    const removeOne = (id, done) => Result.findByIdAndRemove({_id: id},
        (err, data) => done(err, data)
    );

    const remove = (done) => Result.find({}).remove(
        () => done()
    );

    const findOne = (id, done) => Result.findOne({_id: id},
        (err, data) => done(err, data)
    );


    module.exports = {
        find,
        findOne,
        saveOne,
        updateOne,
        removeOne,
        remove
    };

}
