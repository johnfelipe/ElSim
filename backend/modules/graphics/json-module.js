const Graphic = require('./graphic-module'),
    topojson = require('topojson'),
    d3 = require('d3');
/**
 * To handle json charts
 * @module modules/graphics/json-module
 */
module.exports = {

    fillOptions: function () {
        let options = {
            chart: {
                marginTop: 40,
                height: 220
            },
            credits: {
                enabled: false
            },
            title: {
                text: 'Mandates by district',
                margin: 0,
                style: {
                    color: '#000000',
                    fontSize: 14,
                    fontWeight: 'bold'
                }
            },
            legend: {
                enabled: false
            },
            series: [{
                name: 'Escaños',
                type: 'map',
                borderColor: 'white',
                states: {
                    hover: {
                        color: '#606a63'
                    }
                },
                joinBy: ['name', 'name'],
                data: [{
                    name: 'Sevilla',
                    psoe: 8,
                    pp: 4,
                    podemos: 3,
                    ciudadanos: 2,
                    iu: 1
                }]
            }]
        };
    }
};
