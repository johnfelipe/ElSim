const highcharts = require('node-highcharts');
const Color = require('./../misc/colors');
const BarChart = require('./column-chart');
const PieChart = require('./pie-module');
const CountryChart = require('./map-chart');
const User = require('../models/user');
const Result = require('../models/result');
const Icons = require('./../misc/icons');
const District = require('../modules/district');
const Moment = require('moment');
const Q = require('q');
const Timer = require('../misc/timer');

/** Class to manage charts. */
class Chart {
    constructor() {

    }

    /**
     * Give you the string color of a party.
     * @param {String} party - The party name.
     * @return {*}
     */
    static chooseColor(party) {
        if (typeof Color[party] === 'undefined') {
            return 'blue';
        }
        return Color[party];
    }

    /**
     * Fills the options to create a Bar like chart.
     * @param {Object} result
     * @return {*}
     */
    static createColumn(result) {
        return BarChart.fillOptions(result);
    }

    /**
     * Fills the options to create a Pie like chart.
     * @param result
     * @return {*}
     */
    static createPie(result) {
        return PieChart.fillOptions(result);
    }

    /**
     * Fills an object that can be understand from district module.
     * @param {Object} election
     * @param {Object} graphOptions
     * @param {Object} result
     * @param {Object} user
     * @return {Object}
     */
    static fillCalculateDistrictOptions(election, graphOptions, result, user) {
        return {
            title: 'Chart',
            autor: election.eleccion.autor,
            fecha: election.eleccion.fecha,
            provincia: election.cod_provincia,
            options: graphOptions,
            result: result,
            icons: Icons,
            user: user,
            moment: Moment
        };
    }

    /**
     * Saves a simulation to the user simulations history.
     * @param user
     * @param election
     * @param result
     * @param mandates
     * @param percentage
     * @return {*}
     */
    static addResultToUser(user, election, result, mandates, percentage) {
        let promise = Q.defer();

        User.findOne({_id: user._id})
            .then((user) => {
                if (!user) {
                    promise.reject('User not found');
                    return;
                }
                user.resultados.push({
                    fecha: election.eleccion.fecha,
                    provincia: election.cod_provincia,
                    result: result,
                    mandates: mandates,
                    percentage: percentage,
                    blank: election.votos_blanco
                });

                user.save()
                    .then(promise.resolve)
                    .catch(promise.reject);
            })
            .catch(promise.reject);

        return promise.promise;
    }

    /**
     *
     * @param mode
     * @param mandates
     * @param percentage
     * @param resultSelected
     * @param user
     * @return {*}
     */
    static calculateDistrict(mode, mandates, percentage, resultSelected, user) {
        let promise = Q.defer();

        let timer = new Timer('Distric processing time');
        timer.start();

        let votes = [],
            names = [],
            districtOptions = {
                mandates: mandates,
                percentage: percentage,
                blankVotes: 0
            };

        let result = null,
            election = null;

        const handleData = (data) => {
            if (!data) {
                promise.reject('Result not found');
                return;
            }

            election = data;
            districtOptions.blankVotes = data.votos_blanco;

            let keys = Object.keys(data.partidos);
            for (let key of keys) {
                votes.push(data.partidos[key]);
                names.push(key);
            }

            let d = new District(votes, names, districtOptions, true);

            result = d.compute();

            timer.end();
            console.info((timer.name).green + ': '.green + timer.finishSeconds() + 's'.green);

            if (mode === 'column') {
                chartDone(Chart.createColumn(result.parties));
            } else {
                chartDone(Chart.createPie(result.parties));
            }

        };


        Result.findOne({_id: resultSelected})
            .then(handleData)
            .catch(promise.reject);

        const chartDone = (graph_options) => {
            let options = Chart.fillCalculateDistrictOptions(election, graph_options, result, user);

            if (!user) {
                promise.resolve(options);
                return;
            }

            Chart
                .addResultToUser(user, election, result, mandates, percentage)
                .then(() => promise.resolve(options))
                .catch(promise.reject);
        };

        return promise.promise;
    }

    /**
     *
     * @param resultSelected
     * @param percentage
     * @param user
     * @param datos
     * @return {*}
     */
    static calculateCountry(resultSelected, percentage, user, datos) {

        let promise = Q.defer();

        let election = {
            autor: resultSelected.split(',')[1],
            fecha: resultSelected.split(',')[0]
        };

        let config = {
            mandates: 2,
            percentage: parseFloat(percentage),
            blankVotes: 0
        };

        /**
         * The callback that handles the Result.find() operation.
         * @param data
         */
        const handleData = (data) => {
            if (!data) {
                promise.reject('Election not found');
                return;
            }

            let global;

            if (datos.wholeCountry) {
                global = {
                    agrupado: CountryChart.calculateGlobalWholeCountry(data, datos, config.percentage).parties
                };
            } else if (datos.aggregateCommunities) {
                global = {
                    isAggregateCommunities: true,
                    agrupado: CountryChart.calculateGlobalWithCommunities(data, datos, true, config.percentage)
                };
            } else {
                global = CountryChart.calculateGlobal(data, config, datos);
            }

            promise.resolve({
                user: user,
                global: global,
                wholeCountry: datos.wholeCountry,
                communities: datos.aggregateCommunities,
                title: 'Country Chart'
            });
        };

        Result.find({eleccion: election})
            .then(handleData)
            .catch(promise.reject);

        return promise.promise;
    }
}
module.exports = Chart;