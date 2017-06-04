const District = require('../modules/district');
const console = require('better-console');
const Timer = require('../misc/timer');
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
        let votes = [], names = [], result, global = [];

        for (let i = 0, len = data.length; i < len; ++i) {
            config.blankVotes = data[i].votos_blanco;
            config.mandates = MapChartUtil.calculateMandates(data[i].provincia, conjunto);

            let keys = Object.keys(data[i].partidos);

            for (let key of keys) {
                votes.push(data[i].partidos[key]);
                names.push(key);
            }

            let d = new District(votes, names, config, false);

            result = d.compute();

            result.cc = MapChartUtil.calculateCode(data[i].cod_provincia);
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
        let timer = new Timer('Execution time');
        timer.start();
        let global = MapChart.globalLoop(data, config, conjunto);
        global.agrupado = MapChartUtil.groupParties(global);
        timer.end();
        console.info((timer.name).yellow + ': '.yellow + timer.finishSeconds() + '(s)'.yellow);
        return global;
    }
}
module.exports = MapChart;
