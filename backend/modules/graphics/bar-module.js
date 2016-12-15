/* jshint esversion: 6 */
/**
 * To handle bar charts
 * @module modules/graphics/bar-module
 */
module.exports = {
    /** Fills the options object to rend a bar chart */
    fillOptions: function (result) {
        let options = {
            chart: {},
            title: {},
            subtitle: {},
            xAxis: {},
            yAxis: {},
            tooltip: {},
            plotOptions: {},
            legend: {},
            credits: {},
            series: []
        };
        let categories = [],
            mandates = [];

        Object.keys(result).forEach(iteration);

        function iteration(key) {
            if (result[key] > 0) {
                categories.push(key);
                mandates.push({
                    y: result[key],
                    color: require('./graphic-module').chooseColor(key)
                });
            }
        }

        options.chart = {
            type: 'bar',
            plotBackgroundColor: null,
            plotBorderWidth: 0,
            plotShadow: true
        };
        options.title = {
            text: 'Mandates by parties'
        };
        options.xAxis = {
            categories: categories,
            title: {
                text: null
            },
            allowDecimals: false

        };
        options.yAxis = {
            min: 0,
            title: {
                text: 'Mandates',
                align: 'high'
            },
            labels: {
                overflow: 'justify'
            },
            allowDecimals: false,
        };
        options.tooltip = {
            valueSuffix: ' mandates'
        };
        options.plotOptions = {
            bar: {
                dataLabels: {
                    enabled: false
                }
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
        return options;
    }
};
