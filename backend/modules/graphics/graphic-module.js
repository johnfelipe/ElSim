'use strict';
const highcharts = require('node-highcharts');

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

    /** Create a bar chart */
    createBar: function (result, callback) {
        let options = {
            chart: {},
            title: {},
            subtitle: {},
            xAxis: {},
            yAxis: {},
            tooltip: {},
            plotOptions: {},
            legend: {},
            credits: {},
            series: []
        };
        let categories = [],
            mandates = [];

        Object.keys(result).forEach(iteration);

        function iteration(key) {
            if (result[key] > 0){
                categories.push(key);
                mandates.push(result[key]);
            }
        }

        options.chart = {
            type: 'bar',
            plotBackgroundColor: null,
            plotBorderWidth: 0,
            plotShadow: true
        };
        options.title = {
            text: 'Mandates by parties'
        };
        options.subtitle = {
            text: 'Source: <a href="http://www.infoelectoral.mir.es/min/">http://www.infoelectoral.mir.es/min/</a>'
        };
        options.xAxis = {
            categories: categories,
            title: {
                text: null
            }
        };
        options.yAxis = {
            min: 0,
            title: {
                text: 'Mandates',
                align: 'high'
            },
            labels: {
                overflow: 'justify'
            }
        };
        options.tooltip = {
            valueSuffix: ' mandates'
        };
        options.plotOptions = {
            bar: {
                dataLabels: {
                    enabled: true
                }
            }
        };
        options.legend = {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'top',
            x: -40,
            y: 80,
            floating: true,
            borderWidth: 1,
            shadow: true
        };
        options.credits = {
            enabled: false
        };
        options.series = [{
            name: 'Resultado electoral',
            data: mandates
        }];

        callback(options);
    },

    /** Create a pie chart */
    createPie: function (result, callback) {
        console.log(result);
        let options = {
            chart: {},
            title: {},
            subtitle: {},
            xAxis: {},
            yAxis: {},
            tooltip: {},
            plotOptions: {},
            legend: {},
            credits: {},
            series: []
        };
        let resultsArray = [],
            temp = [];

        Object.keys(result).forEach(iteration);

        function iteration(key) {
            if (result[key] > 0)
                resultsArray.push([key, result[key]]);
        }


        options.chart = {
            plotBackgroundColor: null,
            plotBorderWidth: 0,
            plotShadow: true
        };
        options.title = {
            text: 'Resultados<br>Electorales<br>2015',
            align: 'center',
            verticalAlign: 'middle',
            y: 10
        };
        options.tooltip = {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        };
        options.plotOptions = {
            pie: {
                dataLabels: {
                    enabled: true,
                    distance: -30,
                    style: {
                        fontWeight: 'bold',
                        color: 'white'
                    }
                },
                startAngle: -90,
                endAngle: 90,
                center: ['50%', '75%']
            }
        };
        options.series = [{
            type: 'pie',
            name: 'Resultados electorales',
            innerSize: '90%',
            data: resultsArray
        }];
        callback(options);
    }


};