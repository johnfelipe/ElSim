'use strict';
const fs = require('fs'),
    csv = require('fast-csv');
/**
 * Useful module to some utilities
 * @module modules/util-module
 */
module.exports = {

    /** For pretty print any message */
    prettyPrint: function (message) {
        let options = {
            depth: 2,
            colors: true
        };
        try {
            console.dir(message, options);
        } catch (err) {
            throw err;
        }
    },

    groupByKey: function (array) {
        if (!Array.isArray(array)) throw new Error('Use an array to call this method');
        let counts = {};
        for (let i = 0, len = array.length; i < len; ++i) {
            counts[array[i]] = 1 + (counts[array[i]] || 0);
        }
        return counts;
    },

    sortByRest: function (a, b) {
        let keyA = a.rest,
            keyB = b.rest;
        if (keyA > keyB) {
            return -1;
        }
        if (keyA < keyB) {
            return 1;
        }
        return 0;
    },

    ellectionIsInArray: function (obj, array) {
        for (let i = 0, len = array.length; i < len; i++) {
            if (array[i].autor === obj.autor &&
                array[i].fecha === obj.fecha) {
                return true;
            }
        }
        return false;
    },

    readResultados: function (path, done) {
        let stream = fs.createReadStream(path),
            resultados = [];
        csv.fromStream(stream, {
            headers: true
        }).on('data-invalid', this.invalidRowException).on('data', function (data) {
            resultados.push(data);
        }).on('end', function () {
            done(resultados);
        });
    },
    readParties: function (path, resultados, done) {
        let i = 0, stream = fs.createReadStream(path);
        csv.fromStream(stream, {
            headers: true
        }).on('data-invalid', this.invalidRowException).on('data', function (data) {
            resultados[i].partidos = data;
            i++;
        }).on('end', function () {
            done(resultados);
        });
    },

    invalidRowException: function(data){
        throw new Error('Data invalid exception, one or more rows are invalid' + data);
    },

    readCsv: function (path1, path2, done) {
        this.readResultados(path1, function (data) {
            this.readParties(path2,data,function(data){
                done(data);
            });
        });
    }
};