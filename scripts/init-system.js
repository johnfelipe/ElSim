const Q = require('q');
const config = require('../config');
const mongoose = require('mongoose');
mongoose.connect(config.database);
mongoose.Promise = Q.Promise;

const async = require('async');
const UserService = require('../services/users');
const fs = require('fs');
const csv = require('fast-csv');
const credentials = require('../credentials');
const colors = require('colors');
const console = require('better-console');
const ResultService = require('../services/results');
const createHash = require('../passport/signup').createHash;
const PB = require('../misc/progress-bar');

class InitSystem {
    constructor() {

    }

    static setup() {
        let promise = Q.defer();
        let createUser = new PB('Creating user', 1);
        let nick = {
            name: credentials.adminName,
            email: credentials.adminUser,
            password: createHash('password'),
            admin: true,
            resultados: []
        };

        UserService.saveOne(nick)
            .then(() => {
                createUser.addTick();
                return InitSystem.loadCsv();
            })
            .then(() => promise.resolve())
            .catch((err) => promise.reject(err));

        return promise.promise;
    }

    static loadCsv() {
        let promise = Q.defer();

        const years = ['1977', '1979', '1982', '1986', '1989', '1993', '1996','2016'];

        let path1, path2;
        let barYears = new PB('Loading csv files', years.length);

        async.eachSeries(years, (year, callback) => {
            path1 = './csv/' + year + '.csv';
            path2 = './csv/' + year + '_PARTIDOS.csv';

            InitSystem.readCsv(path1, path2)
                .then((data) => {
                    async.eachSeries(data, (dato, callbackData) => {
                        if(typeof dato.comunidad !== 'undefined'){
                            if(dato.comunidad.charAt(dato.comunidad.length -1) === ' '){
                                dato.comunidad = dato.comunidad.slice(0,-1);
                            }
                        }
                        if (typeof dato.partidos !== 'undefined') {
                            ResultService.saveOne(dato)
                                .then(() => {
                                    callbackData();
                                })
                                .catch(callbackData);
                        } else {
                            callbackData('Error guardando datos.');
                        }
                    }, (err) => {
                        if (err) {
                            console.warn(data);
                            callback(err);
                        } else {
                            barYears.addTick();
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
            .then(promise.resolve)
            .catch(promise.reject);

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
console.info('- System is ' + 'setting up'.green);
console.warn('---- Start date: '.green + new Date().toLocaleString());
InitSystem.setup()
    .then(() => {
        console.info('- System has been ' + 'set up'.green + ' up successfully');
        console.warn('---- End date: '.green + new Date().toLocaleString());
        process.exit(0);
    })
    .catch((err) => {
        console.error('An error occurred, now system is cleaning up...');
        console.error('Please run ' + 'npm setup'.blue + ' again');
        console.error('If error again, then stop and send mail to:' + 'jesusgonzaleznovez@gmail.com'.blue);

        const HardReset = require('./hard-reset-class');
        HardReset.hardReset()
            .then(() => {
                console.warn('---- End date: '.green + new Date().toLocaleString());
                process.exit(0);
            })
            .catch((err) => {
                console.error(err);
                console.warn('---- End date: '.green + new Date().toLocaleString());
                process.exit(1);
            });
    });
