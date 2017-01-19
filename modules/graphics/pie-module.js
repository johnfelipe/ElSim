/* jshint esversion: 6 */
/**
 * To handle pie charts
 * @module graphics/pie-module
 */
(function () {

    function fillOptions(result) {
        let options = { };
        let resultsArray = [];

        for(let key in result){
            if (result.hasOwnProperty(key) && result[key] > 0) {
                resultsArray.push({
                    name: key,
                    y: result[key],
                    color: require('./graphic-module').chooseColor(key)
                });
            }
        }

        options.chart = {
            type: 'pie',
            style: {
                fontFamily: 'Signika, serif',
                background: 'url(/images/sand.png)'
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
        fillOptions: fillOptions
    };
})();

