
const Result = require('../models/result');

class ResultService {
    constructor() {

    }
    static find() {
        return Result.find({});
    }

    static saveOne(done) {
        return done(new Error('not yet implemented', null));
    }

    static updateOne(done) {
        return done(new Error('not yet implemented', null));
    }

    static removeOne(id) {
        return Result.findByIdAndRemove({_id: id});
    }

    static remove() {
        return Result.find({}).remove();
    }

    static findOne(id) {
        return Result.findOne({_id: id});
    }

}
module.exports = ResultService;
