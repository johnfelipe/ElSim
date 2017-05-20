/* jshint esversion: 6 */
let pieOptions = require('./options/pie-options');
const has = Object.prototype.hasOwnProperty;

class PieChart {
    constructor() {

    }

    static fillOptions(result) {
        let options = pieOptions,
            resultsArray = [];

        for (let key in result) {
            if (has.call(result, key) && result[key] > 0) {
                resultsArray.push({
                    name: key,
                    y: result[key],
                    color: require('./chart').chooseColor(key)
                });
            }
        }

        options.series[0].data = [...resultsArray];

        return options;
    }
}
module.exports = PieChart;

