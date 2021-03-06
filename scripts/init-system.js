const Q             = require('q');
const config        = require('../config');
const mongoose      = require('mongoose');
const async         = require('async');
const UserService   = require('../services/users');
const fs            = require('fs');
const csv           = require('fast-csv');
const credentials   = require('../credentials');
const colors        = require('colors');
const console       = require('better-console');
const ResultService = require('../services/results');
const createHash    = require('../passport/signup').createHash;
const PB            = require('../misc/progress-bar');
mongoose.connect(config.database);
mongoose.Promise = Q.Promise;

/** Utility to initialize the system, the first time. */
class InitSystem {

    /**
     *
     * @return {*}
     */
    static async setup() {
        console.info('- System is ' + 'setting up'.green);
        console.warn('---- Start date: '.green + new Date().toLocaleString());

        let createUser = new PB('Creating user', 1);

        let nick = {
            name    : credentials.adminName,
            email   : credentials.adminUser,
            password: createHash(credentials.password),
            admin   : true,
            results : []
        };

        await UserService.saveOne(nick);

        console.log('USER: ' + nick.email);
        console.log('PASSWORD: ' + credentials.password);
        console.log('Please write the user and password show above.');
        createUser.addTick();

        return InitSystem.loadCsv();
    }

    /**
     *
     * @return {*}
     */
    static loadCsv() {
        let promise  = Q.defer();

        const years  = ['1977', '1979', '1982', '1986', '1989', '1993', '1996', '2016'];
        let barYears = new PB('Loading csv files', years.length);
        let path1;
        let path2;

        const eachYearCallback = (year, callback) => {
            path1 = './csv/' + year + '.csv';
            path2 = './csv/' + year + '_PARTIDOS.csv';

            const readCsvCallback = (data) => {

                const eachDatoCallback = (dato, callbackData) => {
                    if (typeof dato.community !== 'undefined') {
                        while (dato.community.charAt(dato.community.length - 1) === ' ') {
                            dato.community = dato.community.slice(0, -1);
                        }
                    }

                    if (typeof dato.province !== 'undefined') {
                        while (dato.province.charAt(dato.province.length - 1) === ' ') {
                            dato.province = dato.province.slice(0, -1);
                        }
                    }

                    if (typeof dato.parties !== 'undefined') {
                        ResultService.saveOne(dato)
                            .then(() => callbackData())
                            .catch(callbackData);
                        return;
                    }

                    callbackData('Error guardando datos.');
                };

                const eachDatoFinalCallback = (err) => {
                    if (err) {
                        callback(err);
                        return;
                    }
                    barYears.addTick();
                    callback();
                };

                async.eachSeries(data, eachDatoCallback, eachDatoFinalCallback);
            };

            InitSystem
                .readCsv(path1, path2)
                .then(readCsvCallback)
                .catch(callback);
        };

        const eachYearFinalCallback = (err) => {
            if (err) {
                promise.reject(err);
                return;
            }
            promise.resolve();
        };

        async.eachSeries(years, eachYearCallback, eachYearFinalCallback);

        return promise.promise;
    }

    /**
     *
     * @param path1
     * @param path2
     * @return {*}
     */
    static async readCsv(path1, path2) {
        let data = await InitSystem.readResultados(path1);
        return InitSystem.readParties(path2, data);
    }

    /**
     *
     * @param path
     * @param results
     * @return {*}
     */
    static readParties(path, results) {
        let promise = Q.defer();

        let i = 0, stream = fs.createReadStream(path);

        csv.fromStream(stream, {headers: true})
            .on('data-invalid', (data) => promise.reject('Data invalid exception, one or more rows are invalid' + data))
            .on('data', (data) => {
                let keys = Object.keys(data);
                for (let key of keys) {
                    if (data[key] === '0') {
                        delete data[key];
                    }
                }
                results[i].parties = data;
                i++;
            })
            .on('end', () => promise.resolve(results));

        return promise.promise;
    }

    /**
     *
     * @param path
     * @return {*}
     */
    static readResultados(path) {
        let promise = Q.defer();
        let stream  = fs.createReadStream(path), results = [];

        csv.fromStream(stream, {headers: true})
            .on('data-invalid', (data) => promise.reject('Data invalid exception, one or more rows are invalid' + data))
            .on('data', (data) => results.push(data))
            .on('end', () => promise.resolve(results));

        return promise.promise;
    }
}

const badEnd = async (err) => {
    console.error(err);
    console.error('An error occurred, now system is cleaning up...');
    console.error('Please run ' + 'npm setup'.blue + ' again');
    console.error('If error again, then stop and send mail to:' + 'jesusgonzaleznovez@gmail.com'.blue);

    const HardReset = require('./hard-reset-class');

    try {
        await HardReset.hardReset();
        console.warn('---- End date: '.green + new Date().toLocaleString());
        process.exit(0);
    } catch (err) {
        console.error(err);
        console.warn('---- End date: '.green + new Date().toLocaleString());
        process.exit(1);
    }
};

const goodEnd = () => {
    console.info('- System has been ' + 'set up'.green + ' up successfully');
    console.warn('---- End date: '.green + new Date().toLocaleString());
    process.exit(0);
};

InitSystem.setup()
    .then(goodEnd)
    .catch(badEnd);
