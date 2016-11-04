'use strict';
const highcharts = require('node-highcharts');

/**
 * Clase para manejar gráficas en el lado servidor apoyándose en la librería HighCharts.
 * @returns {Graphic}
 * @constructor
 */
class Graphic {

    constructor() {
        this.options = {
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
    }

    rendChart(callback) {
        highcharts.render(this.options, function (err, data) {
            if (err) {
                console.log('Error: ' + err);
            } else {
                callback(data);
            }
        });
    }

    createBar(result, callback) {
        var categories = [],
            mandates = [];

        for (var i = 0, len = result.length; i < len; i++) {
            if (result[i].mandates > 0) {
                categories.push(result[i].partido);
                mandates.push(result[i].mandates);
            }
        }

        this.options.chart = {
            type: 'bar',
            plotBackgroundColor: null,
            plotBorderWidth: 0,
            plotShadow: true,
            height: 420,
            width: 420
        };
        this.options.title = {
            text: 'Mandates by parties'
        };
        this.options.subtitle = {
            text: 'Source: <a href="http://www.infoelectoral.mir.es/min/">http://www.infoelectoral.mir.es/min/</a>'
        };
        this.options.xAxis = {
            categories: categories,
            title: {
                text: null
            }
        };
        this.options.yAxis = {
            min: 0,
            title: {
                text: 'Mandates',
                align: 'high'
            },
            labels: {
                overflow: 'justify'
            }
        };
        this.options.tooltip = {
            valueSuffix: ' millions'
        };
        this.options.plotOptions = {
            bar: {
                dataLabels: {
                    enabled: true
                }
            }
        };
        this.options.legend = {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'top',
            x: -40,
            y: 80,
            floating: true,
            borderWidth: 1,
            shadow: true
        };
        this.options.credits = {
            enabled: false
        };
        this.options.series = [{
            name: 'Resultado electoral',
            data: mandates
        }];

        callback();
    }

    createPie(result, callback) {
        var resultsArray = [],
            temp = [];
        for (var i = 0, len = result.length; i < len; i++) {
            if (result[i].mandates > 0) {
                temp = [result[i].partido, result[i].mandates];
                resultsArray.push(temp);
            }
        }

        this.options.chart = {
            plotBackgroundColor: null,
            plotBorderWidth: 0,
            plotShadow: true,
            height: 420,
            width: 420
        };
        this.options.title = {
            text: 'Resultados<br>Electorales<br>2015',
            align: 'center',
            verticalAlign: 'middle',
            y: 10
        };
        this.options.tooltip = {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        };
        this.options.plotOptions = {
            pie: {
                dataLabels: {
                    enabled: true,
                    distance: -50,
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
        this.options.series = [{
            type: 'pie',
            name: 'Resultados electorales',
            innerSize: '50%',
            data: resultsArray
        }];
        callback();
    }


}
module.exports = Graphic;
