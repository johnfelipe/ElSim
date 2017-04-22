/* jshint esversion: 6 */
'use strict';
const fs = require('fs'),
    csv = require('fast-csv'),
    Result = require('../models/result'),
    moment = require('moment'),
    Q = require('q');

const console = require('better-console');
/**
 *
 * @module util-module
 */
{

    const checkError = (err) => {
        if (err) {
            throw err;
        }
    };

    const groupByKey = (array) => {
        if (!Array.isArray(array)) {
            throw new Error('Use an array to call this method');
        }
        let counts = {};
        for (let i = 0, len = array.length; i < len; ++i) {
            counts[array[i]] = 1 + (counts[array[i]] || 0);
        }
        return counts;
    };

    const sortByRest = (a, b) => {
        let keyA = a.rest,
            keyB = b.rest;
        if (keyA > keyB) {
            return -1;
        }
        if (keyA < keyB) {
            return 1;
        }
        return 0;
    };

    const ellectionIsInArray = (obj, array) => {
        for (let i = 0, len = array.length; i < len; i++) {
            if (array[i].autor === obj.autor &&
                array[i].fecha === obj.fecha) {
                return true;
            }
        }
        return false;
    };

    const readResultados = (path, done) => {
        let stream = fs.createReadStream(path), resultados = [];

        csv.fromStream(stream, {headers: true})
            .on('data-invalid', (data) => {
                throw new Error('Data invalid exception, one or more rows are invalid' + data);
            })
            .on('data', (data) => {
                resultados.push(data);
            })
            .on('end', () => {
                done(resultados);
            });
    };


    const readParties = (path, resultados, done) => {
        let i = 0, stream = fs.createReadStream(path);
        csv.fromStream(stream, {headers: true})
            .on('data-invalid', (data) => {
                throw new Error('Data invalid exception, one or more rows are invalid' + data);
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
            .on('end', () => {
                done(resultados);
            });
    };

    const readCsv = (path1, path2, done) => {
        readResultados(path1, (data) => {
            readParties(path2, data, (data) => {
                done(data);
            });
        });
    };

    const calculateEllections = () => {
        let promise = Q.defer();

        Result.find({})
            .then((data) => {
                let ellections = [];
                for (let i=0,len=data.length; i<len; i++) {
                    if (!ellectionIsInArray(data[i].eleccion, ellections)) {
                        ellections.push(data[i].eleccion);
                    }
                }

                promise.resolve({data,ellections});
            })
            .catch((err) => {
                console.error(err);
                promise.reject(err);
            });

        return promise.promise;
    };

    const loadCsv = (done) => {
        const years = ['1977', '1979', '1982', '1986', '1989', '1993', '1996'];

        let path1, path2, promises = [];

        const saveCallback = () => {
            console.info('Datos guardados con éxito.');
        };

        const csvCallback = (data) => {
            for (let d of data) {
                if (d.partidos !== undefined) {

                    promises.push(saveResultado(d, saveCallback));
                } else {
                    console.error('Error guardando datos: ', d);
                }
            }
        };

        for (let y of years) {
            path1 = './csv/' + y + '.csv';
            path2 = './csv/' + y + '_PARTIDOS.csv';
            console.warn('Leyendo ' + path1);
            console.warn('Leyendo ' + path2);
            readCsv(path1, path2, csvCallback);
        }

        const saveResultado = (result, done) => {
            let r = new Result(result);

            r.eleccion = {
                fecha: result.fecha,
                autor: 'sistema'
            };

            r.save((err) => {
                if (err) {
                    console.error(err);
                    console.error(err);
                }
                done();
            });
        };

        Promise.all(promises).then(() => done());
    };

    const sortByDate = (a, b) => {
        if (typeof a.eleccion !== 'undefined') {
            return new moment(a.eleccion.fecha) - new moment(b.eleccion.fecha);
        } else {
            return new moment(a.fecha) - new moment(b.fecha);
        }
    };

    module.exports = {
        groupByKey,
        sortByRest,
        ellectionIsInArray,
        readResultados,
        readParties,
        readCsv,
        calculateEllections,
        loadCsv,
        checkError,
        sortByDate
    };
}
