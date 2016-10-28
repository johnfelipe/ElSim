'use strict';
const app = require('./../app'),
    expect = require('chai').expect,
    http = require('http'),
    Sistema = require('./../routes/modules/sistema-module');

/**
 * Test de la clase Sistema
 */
describe('Sistema',function() {
    describe('#constructor()', function() {
        var s;
        it('Should not throw an error if create object', function(done) {
            expect(function(){
                s = new Sistema();
            }).to.not.throw(Error);
            done();
        });
    });
});

