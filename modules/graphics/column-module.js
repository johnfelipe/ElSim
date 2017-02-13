/* jshint esversion: 6 */
const Icons = require('./misc/icons'),
    has = Object.prototype.hasOwnProperty;

let columnOptions = require('./options/column-options');
/**
 * To handle bar charts
 * @module graphics/bar-module
 */
(function () {
    function fillOptions(result) {

        let options = columnOptions, categories = [], mandates = [];
        for (let key in result) {
            if (has.call(result,key) && result[key] > 0) {
                categories.push(key);
                mandates.push({
                    y: result[key],
                    icon: Icons[key],
                    color: require('./graphic-module').chooseColor(key)
                });
            }
        }
        options.xAxis.categories = [...categories];
        options.series[0].data = [...mandates];
        return options;
    }

    module.exports = {
        /** Do something */
        fillOptions: fillOptions
    };
})();
