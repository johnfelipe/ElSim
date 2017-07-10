const District     = require('../modules/district');
const MapChartUtil = require('./map-chart-util');

/** Handles Map charts */
class MapChart {

    /**
     *
     * @param data
     * @param config
     * @param conjunto
     * @return {Array}
     */
    static globalLoop(data, config, conjunto) {
        let votes  = [];
        let names  = [];
        let global = [];
        let result;

        for (let i = 0, len = data.length; i < len; ++i) {
            config.blankVotes = data[i].blank_votes;
            config.mandates   = MapChartUtil.calculateMandates(data[i].province, conjunto);

            let keys = Object.keys(data[i].parties);

            for (let key of keys) {
                votes.push(data[i].parties[key]);
                names.push(key);
            }

            let d = new District(votes, names, config, false);

            result    = d.compute();
            result.cc = MapChartUtil.calculateCode(data[i].cod_province);
            global.push(result);

            votes = [];
            names = [];
        }
        return global;
    }

    /**
     *
     * @param data
     * @param config
     * @param conjunto
     * @return {Array}
     */
    static calculateGlobal(data, config, conjunto) {
        let global      = MapChart.globalLoop(data, config, conjunto);
        global.agrupado = MapChartUtil.groupParties(global);
        return global;
    }
}
module.exports = MapChart;
