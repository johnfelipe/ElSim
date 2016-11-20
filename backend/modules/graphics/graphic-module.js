'use strict';
const highcharts = require('node-highcharts');

module.exports = {
    rendChart: function(options,callback) {
        highcharts.render(options, callbackRender);
        function callbackRender(err, data) {
            if (err) {
                console.log('Error: ' + err);
            } else {
                callback(data);
            }
        }
    },

    createBar: function(result, callback) {
        var options = {
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
        var categories = [],
            mandates = [];

        for (var i = 0, len = result.length; i < len; i++) {
            if (result[i].mandates > 0) {
                categories.push(result[i].partido);
                mandates.push(result[i].mandates);
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

        callback();
    },

    createPie: function(result, callback) {
        var options = {
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
        var resultsArray = [],
            temp = [];
        for (var i = 0, len = result.length; i < len; i++) {
            if (result[i].mandates > 0) {
                temp = [result[i].partido, result[i].mandates];
                resultsArray.push(temp);
            }
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
        callback();
    }


};