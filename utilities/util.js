

const fs = require('fs'),
    csv = require('fast-csv'),
    Result = require('../models/result'),
    moment = require('moment'),
    Q = require('q');

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
            .on('data-invalid', (data) => {
                promise.reject('Data invalid exception, one or more rows are invalid' + data);
            })
            .on('data', (data) => {
                resultados.push(data);
            })
            .on('end', () => {
                promise.resolve(resultados);
            });
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
                for (let key in data) {
                    if (data.hasOwnProperty(key)) {
                        if (data[key] === '0') {
                            delete data[key];
                        }
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

        const reject = (err) => promise.reject(err);

        Util.readResultados(path1)
            .then((data) => {
                Util.readParties(path2, data)
                    .then((data) => promise.resolve(data))
                    .catch(reject);
            }).catch(reject);

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

    static loadCsv() {
        let promise = Q.defer();
        const years = ['1977', '1979', '1982', '1986', '1989', '1993', '1996'];

        let path1, path2, promises = [];

        const loopF = (data) => {
            for (let dato of data) {
                if (dato.partidos !== undefined) {
                    promises.push(saveResultado(dato));
                } else {
                    console.error('Error guardando datos: ', dato);
                }
            }
        };

        const loopE = (err) => promise.reject(err);

        for (let year of years) {
            path1 = './csv/' + year + '.csv';
            path2 = './csv/' + year + '_PARTIDOS.csv';

            Util.readCsv(path1, path2)
                .then(loopF)
                .catch(loopE);
        }

        const saveResultado = (result) => {
            let promiseSave = Q.defer();
            let r = new Result(result);

            r.eleccion = {
                fecha: result.fecha,
                autor: 'sistema'
            };

            r.save()
                .then(() => promiseSave.resolve())
                .catch((err) => promiseSave.reject(err));

            return promiseSave.promise;
        };

        Q.all(promises)
            .then(() => promise.resolve())
            .catch((err) => promise.reject(err));

        return promise.promise;
    }

    static sortByDate(a, b) {
        if (typeof a.eleccion !== 'undefined') {
            return new moment(a.eleccion.fecha) - new moment(b.eleccion.fecha);
        } else {
            return new moment(a.fecha) - new moment(b.fecha);
        }
    }
}
module.exports = Util;
