/* jshint esversion: 6 */
'use strict';
const app = require('./../app'),
    http = require('http');

const foo = (done) => {
    console.log('Not yet implemented');
    done();
};

const basicTest = () => it('Basic test', foo);

/** Test Chart */
describe('Chart', () => {
    describe('#Pie Chart', basicTest);
    describe('#Column Chart', basicTest);
});
