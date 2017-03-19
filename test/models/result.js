/* jshint esversion: 6 */
const Result = require('../../models/result');
const config = require('../../config');
const chai = require('chai');
describe('Result', () => {
    it('find', (done) => {
        Result.find({}, (err, data) => {
            chai.assert(data.length !== 0);
            done();
        });
    });
    it('find by provincia wrong', (done) => {
        Result.find({provincia: null}, (err, data) => {
            chai.assert(err !== undefined);
            done();
        });
    });
});
