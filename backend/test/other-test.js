'use strict';
const app = require('./../app'),
    http = require('http'),
    expect = require('chai').expect;
/**
 * Test de la clase Sistema
 */
describe('Miscellaneous',function() {
    describe('NodeJS Clustering', function() {
        it('Workers', function(done) {
            var numCPUs = require('os').cpus().length;
            expect(numCPUs).to.be.greaterThan(0);
            done();

        });
    });
});
