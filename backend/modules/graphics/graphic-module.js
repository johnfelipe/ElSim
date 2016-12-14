'use strict';
const highcharts = require('node-highcharts'),
    Color = require('./colors'),
    BarChart = require('./bar-module'),
    PieChart = require('./pie-module'),
    CountryChart = require('./map-module');

/**
 * To handle charts
 * @module modules/graphics/graphic-module
 */
module.exports = {

    /** Rends a chart in the server-side */
    rendChart: function (options, callback) {
        highcharts.render(options, callbackRender);
        function callbackRender(err, data) {
            if (err) {
                console.log('Error: ' + err);
            } else {
                callback(data);
            }
        }
    },

    /** Returns the color for a party or blue if not found */
    chooseColor: function (party) {
        if (Color[party] === undefined) {
            return 'blue';
        }
        return Color[party];
    },

    /** Create a bar chart */
    createBar: function (result, callback) {
        let options = BarChart.fillOptions(result);
        callback(options);
    },

    /** Create a pie chart */
    createPie: function (result, callback) {
        let options = PieChart.fillOptions(result);
        callback(options);
    },

    /** Create a country chart */
    createMap: function(results, callback){
        let options = CountryChart.fillOptions(results);
        callback(options);
    }
};