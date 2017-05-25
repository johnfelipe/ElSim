const fs = require('fs'),
    Result = require('../models/result'),
    moment = require('moment'),
    Q = require('q');

class Util {
    constructor() {

    }

    static ellectionIsInArray(obj, array) {
        for (let i = 0, len = array.length; i < len; i++) {
            if (array[i].autor === obj.autor && array[i].fecha === obj.fecha) {
                return true;
            }
        }
        return false;
    }

    static calculateEllections() {
        let promise = Q.defer();

        Result.find({})
            .then((data) => {
                let ellections = [];
                for (let i = 0, len = data.length; i < len; i++) {
                    if (!Util.ellectionIsInArray(data[i].eleccion, ellections)) {
                        ellections.push(data[i].eleccion);
                    }
                }
                promise.resolve({data, ellections});
            })
            .catch((err) => promise.reject(err));

        return promise.promise;
    }

    static sortByDate(a, b) {
        let f1, f2;
        if (typeof a.eleccion !== 'undefined') {
            f1 = new moment(a.eleccion.fecha);
            f2 = new moment(b.eleccion.fecha);
        } else {
            f1 = new moment(a.fecha);
            f2 = new moment(b.fecha);
        }

        if (f1 > f2) {
            return 1;
        } else if (f1 < f2) {
            return -1;
        } else {
            return 0;
        }
    }
}
module.exports = Util;
