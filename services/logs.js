/* jshint esversion: 6 */
const Log = require('../models/log');

{
    const findOne = (id) => {
        return Log.findOne({_id: id});
    };

    const find = () => {
        return Log.find({});
    };

    const remove = () => {
        return Log.find({}).remove();
    };

    const save = (log) => {
        let l = new Log(log);
        return l.save();
    };

    module.exports = {
        findOne,
        find,
        remove,
        save
    };

}