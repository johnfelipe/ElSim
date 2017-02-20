/* jshint esversion: 6 */
'use strict';
const app = require('./../app'),
    http = require('http'),
    District = require('./../modules/district-module'),
    expect = require('chai').expect;

/** Test de District */
describe('District', () => {
    describe('#compute', () => it('Fake data to use compute function', fakeData));
});

const fakeData = (done) => {
    let votes = [12000, 30000, 200000, 4500],
        names = ['PP', 'PSOE', 'PODEMOS', 'CIUDADANOS'],
        options = {
            mandates: 5,
            blankVotes: 1000,
            percentage: 3.0
        };
    let result = District.compute(votes, names, options);
    expect(result).to.have.all.keys('numberOfVotes', 'minNumberOfVotes', 'parties');
    done();
};