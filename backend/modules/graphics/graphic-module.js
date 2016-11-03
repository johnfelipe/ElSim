'use strict';
const highcharts = require('node-highcharts');

/**
 * Clase para manejar gráficas en el lado servidor apoyándose en la librería D3.
 * @returns {Graphic}
 * @constructor
 */
class Graphic{
    constructor(){
        this.options = {};
        this.options2 = {};
    }
    rendChart(callback){
        highcharts.render(this.options, function(err, data) {
            if (err) {
                console.log('Error: ' + err);
            } else {
                callback(data);
            }
        });
    }
    setOptions(result,callback){
        var resultsArray = [];
        var temp = [];
        var categories = [];
        var mandates = [];
        for(var i = 0, len = result.length; i < len; i++){
            if(result[i].mandates > 0) {
                temp = [result[i].partido, result[i].mandates];
                resultsArray.push(temp);
                categories.push(result[i].partido);
                mandates.push(result[i].mandates);
            }
        }
        this.options = {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: 0,
                plotShadow: true,
                height: 420,
                width: 420
            },
            title: {
                text: 'Resultados<br>Electorales<br>2015',
                align: 'center',
                verticalAlign: 'middle',
                y: 10
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
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
            },
            series: [{
                type: 'pie',
                name: 'Resultados electorales',
                innerSize: '50%',
                data: resultsArray
            }]
        };
        this.options2 = {
            chart: {
                type: 'bar',
                plotBackgroundColor: null,
                plotBorderWidth: 0,
                plotShadow: true,
                height: 420,
                width: 420
            },
            title: {
                text: 'Mandates by parties'
            },
            subtitle: {
                text: 'Source: <a href="http://www.infoelectoral.mir.es/min/">http://www.infoelectoral.mir.es/min/</a>'
            },
            xAxis: {
                categories: categories,
                    title: {
                    text: null
                }
            },
            yAxis: {
                min: 0,
                    title: {
                    text: 'Mandates',
                        align: 'high'
                },
                labels: {
                    overflow: 'justify'
                }
            },
            tooltip: {
                valueSuffix: ' millions'
            },
            plotOptions: {
                bar: {
                    dataLabels: {
                        enabled: true
                    }
                }
            },
            legend: {
                layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'top',
                    x: -40,
                    y: 80,
                    floating: true,
                    borderWidth: 1,
                    shadow: true
            },
            credits: {
                enabled: false
            },
            series: [{
                name: 'Resultado electoral',
                data: mandates
            }]
        };
        callback();
    }
    generateExample(callback){
        this.options = {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: 0,
                plotShadow: false,
                height: 1024,
                width: 1024
            },
            title: {
                text: 'Resultados<br>Electorales<br>2015',
                align: 'center',
                verticalAlign: 'middle',
                y: 40
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
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
            },
            series: [{
                type: 'pie',
                name: 'Resultados electorales',
                innerSize: '50%',
                data: [
                    ['PP',   45.00],
                    ['PODEMOS',       30.00],
                    ['PSOE', 15.00],
                    ['CIUDADANOS',    5.00],
                    ['OTROS',     5.00]
                ]
            }]
        };
        this.rendChart(function(data){
            callback(data);
        });
    }
}
module.exports = Graphic;
