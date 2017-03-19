/* jshint esversion: 6 */
'use strict';
const fs = require('fs'),
    csv = require('fast-csv'),
    Result = require('../models/result');

const console = require('better-console');
/**
 *
 * @module util-module
 */
(function () {

    const checkError = (err) => {
        if(err) {
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
        let stream = fs.createReadStream(path),
            resultados = [];
        csv.fromStream(stream, {
            headers: true
        }).on('data-invalid', invalidRowException).on('data', (data) =>
            resultados.push(data)
        ).on('end', () => done(resultados));
    };

    const readParties = (path, resultados, done) => {
        let i = 0, stream = fs.createReadStream(path);
        csv.fromStream(stream, {
            headers: true
        }).on('data-invalid', invalidRowException).on('data', (data) => {
            resultados[i].partidos = data;
            i++;
        }).on('end', () => done(resultados));
    };

    const invalidRowException = (data) => {
        throw new Error('Data invalid exception, one or more rows are invalid' + data);
    };

    const readCsv = (path1, path2, done) => {
        readResultados(
            path1, (data) => readParties(path2, data, (data) => done(data))
        );
    };

    const calculateEllections = (done) => {
        Result.find({}, (err, data) => {
            if (err) {
                throw err;
            }
            let ellections = [];
            for (let i = 0, len = data.length; i < len; i++) {
                if (!ellectionIsInArray(data[i].eleccion, ellections)) {
                    ellections.push(data[i].eleccion);
                }
            }
            done(data, ellections);
        });
    };

    const loadCsv = (done) => {
        const a = ['1977', '1979', '1982', '1986', '1989', '1993', '1996', '2000'];
        let path1, path2, promises = [];

        const csvCallback = (data) => {
            for (let j = 0, lenData = data.length; j < lenData; ++j) {
                if(data[j].partidos !== undefined) {
                    promises.push(saveResultado(data[j], () => {
                    }));
                }else {
                    console.error('ERROR LEYENDO CSV', data[j]);
                }
            }
        };

        for (let i = 0, len = a.length; i < len; ++i) {
            path1 = './csv/' + a[i] + '.csv';
            path2 = './csv/' + a[i] + '_PARTIDOS.csv';
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
                    console.log(err);
                }
                done();
            });
        };

        Promise.all(promises).then(() => done());
    };

    const sortByDate = (a, b) => {
        if(a.hasOwnProperty('eleccion')){
            return new Date(a.eleccion.fecha) - new Date(b.eleccion.fecha);
        }else {
            return new Date(a.fecha) - new Date(b.fecha);
        }
    };

    module.exports = {
        groupByKey: groupByKey,
        sortByRest: sortByRest,
        ellectionIsInArray: ellectionIsInArray,
        readResultados: readResultados,
        readParties: readParties,
        invalidRowException: invalidRowException,
        readCsv: readCsv,
        calculateEllections: calculateEllections,
        loadCsv: loadCsv,
        checkError: checkError,
        sortByDate: sortByDate
    };
})();
