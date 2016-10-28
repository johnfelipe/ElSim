'use strict';
const app = require('./../app'),
      http = require('http'),
      dhont = require('./../routes/modules/dhondt-module'),
      expect = require('chai').expect;

/**
 * Test del modelo User
 */
describe('D´Hondt', function() {
    describe('#compute()', function() {
        it('Basic usage', function(done) {
            var d = new dhont();
            var votes = [168000,104000,72000,64000,40000,32000];
            d.votes = votes;
            d.mandates = 8;
            d.compute();
            expect(d.results.toString()).to.equal([4,2,1,1,0,0].toString());
            done();

        });
    });
});