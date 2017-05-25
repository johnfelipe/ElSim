const fs = require('fs'),
    csv = require('fast-csv'),
    Result = require('../models/result'),
    moment = require('moment'),
    Q = require('q');

const async = require('async');
const console = require('better-console');

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

    static readResultados(path) {
        let promise = Q.defer();
        let stream = fs.createReadStream(path), resultados = [];

        csv.fromStream(stream, {headers: true})
            .on('data-invalid', (data) => promise.reject('Data invalid exception, one or more rows are invalid' + data))
            .on('data', (data) => resultados.push(data))
            .on('end', () => promise.resolve(resultados));

        return promise.promise;
    }

    static readParties(path, resultados) {
        let promise = Q.defer();

        let i = 0, stream = fs.createReadStream(path);

        csv.fromStream(stream, {headers: true})
            .on('data-invalid', (data) => {
                promise.reject('Data invalid exception, one or more rows are invalid' + data);
            })
            .on('data', (data) => {
                let keys = Object.keys(data);
                for (let key of keys) {
                    if (data[key] === '0') {
                        delete data[key];
                    }
                }
                resultados[i].partidos = data;
                i++;
            })
            .on('end', () => promise.resolve(resultados));

        return promise.promise;
    }

    static readCsv(path1, path2) {
        let promise = Q.defer();

        const resultsLoaded = (data) => Util.readParties(path2, data);

        Util.readResultados(path1)
            .then(resultsLoaded)
            .then((data) => promise.resolve(data))
            .catch((err) => promise.reject(err));

        return promise.promise;
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

    static saveResultado(result) {
        let r = new Result(result);

        r.eleccion = {
            fecha: result.fecha,
            autor: 'sistema'
        };

        return r.save();
    }

    static loadCsv() {
        let promise = Q.defer();
        const years = ['1977', '1979', '1982', '1986', '1989', '1993', '1996'];

        let path1, path2;

        async.eachSeries(years, (year, callback) => {
            path1 = './csv/' + year + '.csv';
            path2 = './csv/' + year + '_PARTIDOS.csv';

            Util.readCsv(path1, path2)
                .then((data) => {
                    async.eachSeries(data, (dato, callbackData) => {
                        if (typeof dato.partidos !== 'undefined') {
                            Util.saveResultado(dato)
                                .then(() => callbackData())
                                .catch(callbackData);
                        } else {
                            callbackData('Error guardando datos.');
                        }
                    }, (err) => {
                        if (err) {
                            callback(err);
                        } else {
                            callback();
                        }
                    });
                })
                .catch(callback);
        }, (err) => {
            if (err) {
                promise.reject(err);
            } else {
                promise.resolve();
            }
        });

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
