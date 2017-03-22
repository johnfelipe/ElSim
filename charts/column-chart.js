/* jshint esversion: 6 */
const Icons = require('./../misc/icons'),
    has = Object.prototype.hasOwnProperty;

let columnOptions = require('./options/column-options');

/**
 *
 * @module column-module
 */
{
    const fillOptions = (result) => {
        if (typeof result === 'undefined' ||
            result === null) {
            return new Error('invalid param type');
        }
        let options = columnOptions, categories = [], mandates = [];

        for (let key in result) {
            if (has.call(result, key) && result[key] > 0) {
                categories.push(key);
                mandates.push({
                    y: result[key],
                    icon: Icons[key],
                    color: require('./chart').chooseColor(key)
                });
            }
        }

        options.xAxis.categories = [...categories];
        options.series[0].data = [...mandates];

        return options;
    };


    module.exports = {
        /** Fills options to a column chart */
        fillOptions
    };
}
