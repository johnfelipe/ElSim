/* jshint esversion: 6 */
const Icons = require('./icons');
/**
 * To handle bar charts
 * @module graphics/bar-module
 */
(function () {
    function fillOptions(result) {
        let options, categories = [], mandates = [];
        for (let key in result) {
            if (result.hasOwnProperty(key) && result[key] > 0) {
                categories.push(key);
                mandates.push({
                    y: result[key],
                    icon: Icons[key],
                    color: require('./graphic-module').chooseColor(key)
                });
            }
        }
        options = {
            chart: {
                type: 'column',
                backgroundColor: null,
                style: {
                    fontFamily: 'Signika, serif',
                    background: 'url(/images/sand.png)'
                }
            },
            title: {
                text: 'District result',
                style: {
                    color: 'black',
                    fontSize: '16px',
                    fontWeight: 'bold'
                }
            },
            subtitle: {
                text: 'Mandates by parties',
                style: {
                    color: 'black'
                }
            },
            xAxis: {
                categories: categories,
                allowDecimals: false,
                crosshair: true,
                labels: {
                    style: {
                        color: '#6e6e70'
                    }
                }

            },
            yAxis: {
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
            },
            tooltip: {
                valueSuffix: ' mandates',
                pointFormat: '{point.y}',
                shared: true
            },
            plotOptions: {
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

            },
            legend: {
                enabled: false
            },
            credits: {
                enabled: false
            },
            series: [{
                name: 'Mandates',
                data: mandates
            }],
            background2: '#E0E0E8'
        };
        return options;
    }

    module.exports = {
        /** Do something */
        fillOptions: fillOptions
    };
})();
