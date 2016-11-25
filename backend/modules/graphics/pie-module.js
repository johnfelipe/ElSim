const Graphic = require('./graphic-module'),
    fs = require('fs'),
    d3 = require('d3');
/**
 * To handle pie charts
 * @module modules/graphics/pie-module
 */
module.exports = {

    /** Fills the options object to rend a pie chart */
    fillOptions: function(result){
        let options = {
            chart: {},
            title: {},
            tooltip: {},
            plotOptions: {},
            series: []
        };
        let resultsArray = [];

        Object.keys(result).forEach(iteration);

        function iteration(key) {
            if (result[key] > 0)
                resultsArray.push({
                    name: key,
                    y: result[key],
                    color: require('./graphic-module').chooseColor(key)
                });
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
};

