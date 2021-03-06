const highcharts          = require('node-highcharts');
const Color               = require('./../misc/colors');
const BarChart            = require('./column-chart');
const PieChart            = require('./pie-module');
const MapChart            = require('./map-chart');
const MapCommunitiesChart = require('./map-communities-chart');
const MapWholeChart       = require('./map-whole-chart');
const User                = require('../models/user');
const Result              = require('../models/result');
const Icons               = require('./../misc/icons');
const District            = require('../modules/district');
const moment              = require('moment');
const Timer               = require('../misc/timer');

/** Class to manage charts. */
class Chart {

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
        return BarChart(result);
    }

    /**
     * Fills the options to create a Pie like chart.
     * @param result
     * @return {*}
     */
    static createPie(result) {
        return PieChart(result);
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
            title   : 'Chart',
            author  : election.election.author,
            date    : election.election.date,
            province: election.cod_province,
            options : graphOptions,
            result,
            icons   : Icons,
            user,
            moment
        };
    }

    /**
     * Saves a simulation to the user simulations history.
     * @param user
     * @param election
     * @param result
     * @param mandates
     * @param percentage
     * @return {Q.Promise}
     */
    static async addResultToUser(user, election, result, mandates, percentage) {
        try {
            let user = await User.findOne({_id: user._id});
            if (!user) {
                throw Error('User not found');
            }

            user.results.push({
                date    : election.election.date,
                province: election.cod_province,
                result,
                mandates,
                percentage,
                blank   : election.blank_votes
            });

            return await user.save();
        } catch (err) {
            throw err;
        }
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
    static async calculateDistrict(mode, mandates, percentage, resultSelected, user) {
        try {
            let timer = new Timer('Execution time');
            timer.start();

            let votes           = [];
            let names           = [];
            let districtOptions = {
                mandates,
                percentage,
                blankVotes: 0
            };

            let result;
            let election;

            let data = await Result.findOne({_id: resultSelected});

            if (!data) {
                throw Error('Result not found');
            }

            election                   = data;
            districtOptions.blankVotes = data.blank_votes;

            let keys = Object.keys(data.parties);
            for (let key of keys) {
                votes.push(data.parties[key]);
                names.push(key);
            }

            let d  = new District(votes, names, districtOptions, true);
            result = d.compute();

            timer.end();

            let graph_options;
            if (mode === 'column') {
                graph_options = await Chart.createColumn(result.parties);
            } else {
                graph_options = await Chart.createPie(result.parties);
            }

            let options = Chart.fillCalculateDistrictOptions(election, graph_options, result, user);
            if (typeof user === 'undefined' || !user) {
                return options;
            }

            await Chart.addResultToUser(user, election, result, mandates, percentage);
            return options;
        } catch (err) {
            throw err;
        }

    }

    /**
     *
     * @param resultSelected
     * @param percentage
     * @param user
     * @param datos
     * @return {*}
     */
    static async calculateCountry(resultSelected, percentage, user, datos) {
        try {
            let election = {
                author: resultSelected.split(',')[1],
                date  : resultSelected.split(',')[0]
            };

            let p = parseFloat(percentage);
            if (isNaN(p)) p = 0;
            let config = {
                mandates  : 2,
                percentage: (p >= 0) ? p : (p * -1),
                blankVotes: 0
            };

            let data = await Result.find({election});

            if (!data) {
                throw Error('Election not found');
            }

            let global;

            if (datos && typeof datos.wholeCountry !== 'undefined') {
                global = {
                    agrupado: MapWholeChart(data, datos, config.percentage).parties
                };
            } else if (datos && typeof datos.aggregateCommunities !== 'undefined') {
                global = {
                    isAggregateCommunities: true,
                    agrupado              : MapCommunitiesChart(data, datos, true, config.percentage)
                };
            } else {
                global = MapChart.calculateGlobal(data, config, datos);
            }

            return {
                user,
                global,
                wholeCountry: (datos && typeof datos.wholeCountry !== 'undefined') ? datos.wholeCountry : false,
                communities : (datos && typeof datos.aggregateCommunities !== 'undefined') ? datos.aggregateCommunities : false,
                title       : 'Country Chart'
            };
        } catch (err) {
            throw err;
        }
    }
}
module.exports = Chart;