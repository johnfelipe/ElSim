/* jshint esversion: 6 */

let District = require('../district-module');
/**
 * To handle map charts
 * @module graphics/map-module
 */
(function () {

    function fillOptions(results) {
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
        return options;
    }

    function calculateCode(cod_provincia){
        let provincias = [
            'es-NULL','es-vi','es-ab','es-a','es-al','es-av','es-ba','es-pm',
            'es-b','es-bu','es-cc','es-ca','es-cs','es-cr','es-co','es-c',
            'es-cu','es-gi','es-gr','es-gu','es-ss','es-h','es-hu','es-j',
            'es-le','es-l','es-lo','es-lu','es-m','es-ma','es-mu','es-na',
            'es-or','es-o','es-p','es-gc','es-po','es-sa','es-tf','es-s',
            'es-sg','es-se','es-so','es-t','es-te','es-to','es-v','es-va',
            'es-bi','es-za','es-z','es-ce','es-ml'
        ];
        return provincias[cod_provincia];
    }

    function calculateMandates(provincia, conjunto){
        console.log(provincia);
        console.log(conjunto);
        return 2;
    }

    function calculateGlobal(data,config,conjunto) {

        let votes = [],
            names = [],
            result;
        let global = [];
        let i,len = data.length;
        for (i = 0; i < len; i++) {
            config.blankVotes = data[i].votos_blanco;
            config.mandates = calculateMandates(data[i].provincia,conjunto);
            Object.keys(data[i].partidos).forEach(iteration);
            result = District.compute(votes, names, config);
            result['cc'] = calculateCode(data[i].cod_provincia);
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

    module.exports = {
        /**
         * @description
         * @function
         */
        fillOptions: fillOptions,

        /**
         * @description
         * @function
         */
        calculateGlobal: calculateGlobal
    };

})();

