/* jshint esversion: 6 */
'use strict';
const app = require('./../app'),
    http = require('http');

const foo = (done) => {
    console.log('Not yet implemented');
    done();
};

const basicTest = () => it('Basic test', foo);

/** Test Graphic */
describe('Graphic', () => {
    describe('#Pie Chart', basicTest);
    describe('#Column Chart', basicTest);
});
