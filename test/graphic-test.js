/* jshint esversion: 6 */
'use strict';
const app = require('./../app'),
    http = require('http');

/** Test Graphic */
describe('Graphic', () => {
    describe('#Pie Chart', basicTest);
    describe('#Column Chart', basicTest);
});

const basicTest = () => it('Basic test', foo);

const foo = (done) => {
    console.log('Not yet implemented');
    done();
};