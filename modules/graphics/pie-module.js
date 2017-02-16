/* jshint esversion: 6 */
let pieOptions = require('./options/pie-options');
const has = Object.prototype.hasOwnProperty;

/** To handle pie charts */
(function () {
    const fillOptions = (result) => {
        let options = pieOptions,
            resultsArray = [];

        for (let key in result) {
            if (has.call(result,key) && result[key] > 0) {
                resultsArray.push({
                    name: key,
                    y: result[key],
                    color: require('./graphic-module').chooseColor(key)
                });
            }
        }

        options.series[0].data = [...resultsArray];

        return options;
    };

    module.exports = {
        fillOptions: fillOptions
    };
})();

