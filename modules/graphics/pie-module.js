/* jshint esversion: 6 */
let pieOptions = require('./options/pie-options');
/**
 * To handle pie charts
 * @module graphics/pie-module
 */
(function () {

    function fillOptions(result) {
        let options = pieOptions,
            resultsArray = [];

        for (let key in result) {
            if (result.hasOwnProperty(key) && result[key] > 0) {
                resultsArray.push({
                    name: key,
                    y: result[key],
                    color: require('./graphic-module').chooseColor(key)
                });
            }
        }

        options.series[0].data = [...resultsArray];
        return options;
    }

    module.exports = {
        fillOptions: fillOptions
    };
})();

