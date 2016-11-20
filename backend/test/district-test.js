'use strict';
const app = require('./../app'),
      http = require('http'),
      dhont = require('./../modules/district-module'),
      expect = require('chai').expect;

/**
 * Test de District
 * @module test/district-test
 */
describe('District', function() {
    describe('#compute()', function() {
        it('Basic usage', function(done) {
            let votes = [168000,104000,72000,64000,40000,32000],
                mandates = 8;
            let results = dhont.compute(votes,mandates);
            expect(results.toString()).to.equal([4,2,1,1,0,0].toString());
            done();
        });
    });
});