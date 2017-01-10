/* jshint esversion: 6 */
const chooseColor = require('./graphic-module').chooseColor;
/**
 * To handle pie charts
 * @module graphics/pie-module
 */
(function () {

    function fillOptions(result) {
        let options = {
            chart: {},
            title: {},
            tooltip: {},
            plotOptions: {},
            series: []
        };
        let resultsArray = [];

        for(let key in result){
            if (result[key] > 0) {
                resultsArray.push({
                    name: key,
                    y: result[key],
                    color: chooseColor(key)
                });
            }
        }

        options.chart = {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie',
            options3d: {
                enabled: true,
                alpha: 45,
                beta: 0
            }
        };
        options.title = {
            text: 'Results',
            align: 'center',
            verticalAlign: 'top',
            y: 20
        };
        options.tooltip = {
            pointFormat: '{series.name}: <b>{point.y}</b>'
        };
        options.plotOptions = {
            pie: {
                allowPointSelect: true,
                depth: 35,
                dataLabels: {
                    enabled: true,
                    connectorColor: 'silver'
                },
                startAngle: -90,
                endAngle: 90,
                center: ['50%', '75%']
            }
        };
        options.series = [{
            name: 'Mandates ',
            innerSize: '0%',
            data: resultsArray
        }];
        return options;
    }

    module.exports = {
        /**
         * @description
         * @function
         */
        fillOptions: fillOptions
    };
})();

