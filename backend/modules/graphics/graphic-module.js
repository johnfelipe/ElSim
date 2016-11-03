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
