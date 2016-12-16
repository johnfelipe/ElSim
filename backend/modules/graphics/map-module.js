/* jshint esversion: 6 */

let District = require('./graphic-module'),
    spainMap = require('./spain-map');
module.exports = {

    fillOptions: function(results){
        let options = {

            title: {
                text: 'Highmaps basic demo'
            },

            subtitle: {
                text: 'Source map: <a href="https://code.highcharts.com/mapdata/countries/es/es-all.js">Spain</a>'
            },

            colorAxis: {
                min: 0
            },
            tooltip: {
                backgroundColor: 'none',
                borderWidth: 0,
                shadow: true,
                useHTML: true,
                padding: 0,
                pointFormat: '{point.partidos}',
                positioner: function () {
                    return {x: 0, y: 250};
                }
            },
            series: [{
                data: data,
                mapData: Highcharts.maps['countries/es/es-all'],
                joinBy: 'hc-key',
                name: 'Partidos',
                states: {
                    hover: {
                        color: '#a4edba'
                    }
                },
                dataLabels: {
                    enabled: true,
                    format: '{point.name}'
                }
            }]
        };

    },
    calculateGlobal: function(data){
        let votes = [],
            names = [],
            result,
            config = {
                mandates: 2,
                percentage: 3,
                blankVotes: 0
            };
        let global = [];
        for (let i = 0, len = data.length; i < len; i++) {
            config.blankVotes = data[i].votos_blanco;
            Object.keys(data[i].partidos).forEach(iteration);
            result = District.compute(votes, names, config);
            global.push(result);
            votes = [];
            names = [];
        }
        function iteration(key) {
            votes.push(data[i].partidos[key]);
            names.push(key);
        }
        return global;
    }

};

