
const Result = require('../models/result');

class ResultService {
    constructor() {

    }
    static find() {
        return Result.find({});
    }

    static saveOne(result) {
        let r = new Result(result);

        r.eleccion = {
            fecha: result.fecha,
            autor: 'sistema'
        };

        return r.save();
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
