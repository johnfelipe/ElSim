/* jshint esversion: 6 */
const fs = require('fs'),
    csv = require('fast-csv'),
    Result = require('../models/result');
/**
 * Useful module to some utilities
 * @module util-module
 */
(function () {
    function prettyPrint(message) {
        let options = {
            depth: 2,
            colors: true
        };
        try {
            console.dir(message, options);
        } catch (err) {
            throw err;
        }
    }

    function groupByKey(array) {
        if (!Array.isArray(array)) throw new Error('Use an array to call this method');
        let counts = {};
        for (let i = 0, len = array.length; i < len; ++i) {
            counts[array[i]] = 1 + (counts[array[i]] || 0);
        }
        return counts;
    }

    function sortByRest(a, b) {
        let keyA = a.rest,
            keyB = b.rest;
        if (keyA > keyB) {
            return -1;
        }
        if (keyA < keyB) {
            return 1;
        }
        return 0;
    }

    function ellectionIsInArray(obj, array) {
        for (let i = 0, len = array.length; i < len; i++) {
            if (array[i].autor === obj.autor &&
                array[i].fecha === obj.fecha) {
                return true;
            }
        }
        return false;
    }

    function readResultados(path, done) {
        let stream = fs.createReadStream(path),
            resultados = [];
        csv.fromStream(stream, {
            headers: true
        }).on('data-invalid', invalidRowException).on('data', function (data) {
            resultados.push(data);
        }).on('end', function () {
            done(resultados);
        });
    }

    function readParties(path, resultados, done) {
        let i = 0, stream = fs.createReadStream(path);
        csv.fromStream(stream, {
            headers: true
        }).on('data-invalid', invalidRowException).on('data', function (data) {
            resultados[i].partidos = data;
            i++;
        }).on('end', function () {
            done(resultados);
        });
    }

    function invalidRowException(data) {
        throw new Error('Data invalid exception, one or more rows are invalid' + data);
    }

    function readCsv(path1, path2, done) {
        readResultados(path1, function (data) {
            readParties(path2, data, function (data) {
                done(data);
            });
        });
    }

    function calculateEllections(done) {
        Result.find({}, function (err, data) {
            if (err) throw err;
            let ellections = [];
            for (let i = 0, len = data.length; i < len; i++) {
                if (!ellectionIsInArray(data[i].eleccion, ellections)) {
                    ellections.push(data[i].eleccion);
                }
            }
            done(data, ellections);
        });
    }

    function loadCsv(done) {
        const a = ['1977', '1979', '1982', '1986', '1989', '1993', '1996','2000'];
        let path1, path2, promises = [];
        for (let i = 0, len = a.length; i < len; ++i) {
            path1 = './csv/' + a[i] + '.csv';
            path2 = './csv/' + a[i] + '_PARTIDOS.csv';
            readCsv(path1, path2, csvCallback);
        }
        function csvCallback(data) {
            for (let j = 0, lenData = data.length; j < lenData; ++j) {
                promises.push(saveResultado(data[j], function(){}));
            }
        }
        function saveResultado(result, done) {

            let r = new Result(result);
            r.eleccion = {
                fecha: result.fecha,
                autor: 'sistema'
            };
            r.save(function (err) {
                if (err) console.log(err);
                done();
            });
        }
        Promise.all(promises).then(function () {
            done();
        });
    }

    function getResultadoById(id, done) {
        Result.findOne({_id: id}, function (err, data) {
            if (err) throw err;
            done(data);
        });
    }

    module.exports = {
        prettyPrint: prettyPrint,
        groupByKey: groupByKey,
        sortByRest: sortByRest,
        ellectionIsInArray: ellectionIsInArray,
        readResultados: readResultados,
        readParties: readParties,
        invalidRowException: invalidRowException,
        readCsv: readCsv,
        calculateEllections: calculateEllections,
        loadCsv: loadCsv,
        getResultadoById: getResultadoById
    };
})();
