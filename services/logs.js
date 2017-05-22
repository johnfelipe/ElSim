
const Log = require('../models/log');

class LogService {
    constructor() {

    }

    static findOne(id) {
        return Log.findOne({_id: id});
    }

    static find() {
        return Log.find({});
    }

    static remove() {
        return Log.find({}).remove();
    }

    static save(log) {
        let l = new Log(log);
        return l.save();
    }
}
module.exports = LogService;