/* jshint esversion: 6 */


/**
 * Utilities for a set of districts
 * @module modules/electoral-system-module
 */
(function () {
    function calculate(districts) {
        let global = {};
        for (let i = 0, len = districts.length; i < len; ++i) {
            Object.keys(districts[i].parties).forEach(iteration);
        }
        function iteration(key, i) {
            if (global[key] === undefined) {
                global[key] = 0;
            }
            global[key] += districts[i].parties[key];
        }

        return global;
    }

    module.exports = {
        calculate: calculate
    };
})();
