/* jshint esversion: 6 */
const Log = require('../models/log');

{
    const findOne = (id) => Log.findOne({_id: id});

    const find = () => Log.find({});

    const remove = () => Log.find({}).remove();

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