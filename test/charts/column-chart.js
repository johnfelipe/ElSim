
const chai = require('chai');
const columnChart = require('../../charts/column-chart');
const Result = require('../../models/result');
describe('column-chart', () => {

    it('fillOptions with null', (done) => {
        chai.assert(columnChart.fillOptions(null) !== new Error('invalid param type'));
        done();
    });

    it('fillOptions with undefined', (done) => {
        chai.assert(columnChart.fillOptions(undefined) !== new Error('invalid param type'));
        done();
    });
});
