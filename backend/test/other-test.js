'use strict';
const app = require('./../app'),
    http = require('http'),
    expect = require('chai').expect;
/**
 * Test Miscellaneus
 * @module test/other-test
 */
describe('Miscellaneous',function() {
    describe('NodeJS Clustering', function() {
        it('Workers', function(done) {
            let numCPUs = require('os').cpus().length;
            expect(numCPUs).to.be.greaterThan(0);
            done();

        });
    });
});

