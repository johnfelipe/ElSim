const UserService = require('../services/users');
const Q = require('q');
const fs = require('fs');
const csv = require('fast-csv');
const credentials = require('../credentials');

class InitSystem {
    constructor() {

    }

    static setup() {
        let promise = Q.defer();

        let nick = {
            name: credentials.adminName,
            email: credentials.adminUser,
            password: 'password',
            admin: true,
            resultados: []
        };

        UserService.saveOne(nick)
            .then(InitSystem.loadCsv)
            .then(() => promise.resolve())
            .catch((err) => promise.reject(err));

        return promise.promise;
    }

    static loadCsv() {
        let promise = Q.defer();
        const years = ['1977', '1979', '1982', '1986', '1989', '1993', '1996'];

        let path1, path2;

        async.eachSeries(years, (year, callback) => {
            path1 = './csv/' + year + '.csv';
            path2 = './csv/' + year + '_PARTIDOS.csv';

            InitSystem.readCsv(path1, path2)
                .then((data) => {
                    async.eachSeries(data, (dato, callbackData) => {
                        if (typeof dato.partidos !== 'undefined') {
                            InitSystem.saveResultado(dato)
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

    static readCsv(path1, path2) {
        let promise = Q.defer();

        const resultsLoaded = (data) => InitSystem.readParties(path2, data);

        InitSystem.readResultados(path1)
            .then(resultsLoaded)
            .then((data) => promise.resolve(data))
            .catch((err) => promise.reject(err));

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

    static readResultados(path) {
        let promise = Q.defer();
        let stream = fs.createReadStream(path), resultados = [];

        csv.fromStream(stream, {headers: true})
            .on('data-invalid', (data) => promise.reject('Data invalid exception, one or more rows are invalid' + data))
            .on('data', (data) => resultados.push(data))
            .on('end', () => promise.resolve(resultados));

        return promise.promise;
    }
}