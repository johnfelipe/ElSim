/* jshint esversion: 6 */
const Result = require('../models/result');

{

    const find = () => {
        return Result.find({});
    };

    const saveOne = (done) => {
        done(new Error('not yet implemented', null));
    };

    const updateOne = (done) => {
        done(new Error('not yet implemented', null));
    };

    const removeOne = (id) => {
        return Result.findByIdAndRemove({_id: id});
    };

    const remove = () => {
        return Result.find({}).remove();
    };

    const findOne = (id) => {
        return Result.findOne({_id: id});
    };


    module.exports = {
        find,
        findOne,
        saveOne,
        updateOne,
        removeOne,
        remove
    };

}
