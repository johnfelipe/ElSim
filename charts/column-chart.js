const Icons       = require('./../misc/icons');
const clone       = require('clone-any');
let columnOptions = require('./options/column-options');

module.exports = (result) => {
    if (typeof result === 'undefined' || result === null) {
        return new Error('invalid param type');
    }

    let options    = columnOptions;
    let categories = [];
    let mandates   = [];

    let keys = Object.keys(result);
    for (let key of keys) {
        if (result[key] > 0) {
            categories.push(key);
            mandates.push({
                y    : result[key],
                icon : Icons[key],
                color: require('./chart').chooseColor(key)
            });
        }
    }

    options.xAxis.categories = [...categories];
    options.series[0].data   = [...mandates];

    return options;
};
