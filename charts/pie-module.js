let pieOptions = require('./options/pie-options');

module.exports = (result) => {
    let options      = pieOptions;
    let resultsArray = [];
    let keys         = Object.keys(result);

    for (let key of keys) {
        if (result[key] > 0) {
            resultsArray.push({
                name : key,
                y    : result[key],
                color: require('./chart').chooseColor(key)
            });
        }
    }

    options.series[0].data = [...resultsArray];

    return options;
};

