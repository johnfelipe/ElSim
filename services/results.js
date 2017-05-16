/* jshint esversion: 6 */
const Result = require('../models/result');

{

    const find = () => Result.find({});

    const saveOne = (done) => done(new Error('not yet implemented', null));

    const updateOne = (done) => done(new Error('not yet implemented', null));

    const removeOne = (id) => Result.findByIdAndRemove({_id: id});

    const remove = () => Result.find({}).remove();

    const findOne = (id) => Result.findOne({_id: id});

    module.exports = {
        find,
        findOne,
        saveOne,
        updateOne,
        removeOne,
        remove
    };

}
