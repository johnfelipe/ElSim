/* jshint esversion: 6 */
const Icons = require('./icons');
/**
 * To handle bar charts
 * @module graphics/bar-module
 */
(function () {
    function fillOptions(result) {
        let options = {};
        let categories = [],
            mandates = [];

        for (let key in result) {
            if (result[key] > 0) {
                categories.push(key);
                mandates.push({
                    y: result[key],
                    icon: Icons[key],
                    color: require('./graphic-module').chooseColor(key)
                });
            }
        }

        options.chart = {
            type: 'column',
            backgroundColor: null,
            style: {
                fontFamily: 'Signika, serif',
                background: 'url(/images/sand.png)'
            }
        };
        options.title = {
            text: 'District result',
            style: {
                color: 'black',
                fontSize: '16px',
                fontWeight: 'bold'
            }
        };
        options.subtitle = {
            text: 'Mandates by parties',
            style: {
                color: 'black'
            }
        };
        options.xAxis = {
            categories: categories,
            allowDecimals: false,
            crosshair: true,
            labels: {
                style: {
                    color: '#6e6e70'
                }
            }

        };
        options.yAxis = {
            min: 0,
            title: {
                text: 'Mandates'
            },
            allowDecimals: false,
            labels: {
                style: {
                    color: '#6e6e70'
                }
            }
        };
        options.tooltip = {
            valueSuffix: ' mandates',
            pointFormat: '{point.y}',
            shared: true
        };
        options.plotOptions = {
            series: {
                shadow: true
            },
            candlestick: {
                lineColor: '#404048'
            },
            map: {
                shadow: false
            },
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }

        };
        options.legend = {
            enabled: false
        };
        options.credits = {
            enabled: false
        };
        options.series = [{
            name: 'Mandates',
            data: mandates
        }];
        options.background2 = '#E0E0E8';

        return options;
    }

    module.exports = {
        /**
         * @description Do something
         * @param req {request}
         * @param callback {function}
         * @function
         */
        fillOptions: fillOptions
    };
})();
