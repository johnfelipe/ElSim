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
                width: 300,
                height: 300,
                defaultSeriesType: 'bar'
            },
            legend: {
                enabled: false
            },
            title: {
                text: 'Highcharts rendered by Node!'
            },
            series: [{
                data: [ 1, 2, 3, 4, 5, 6 ]
            }]
        };
        this.rendChart(function(data){
            callback(data);
        });
    }
}
module.exports = Graphic;
