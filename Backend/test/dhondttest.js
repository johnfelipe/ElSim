'use strict';
var app = require('./../app'),
    http = require('http'),
    request = require('request'),
    dhont = require('./../routes/modules/dhondt_module'),
    DB = require('./../routes/modules/dbmanager_module'),
    _ = require('./../routes/modules/utils_module');

/**
 * Test del modelo User
 */
describe('D´Hondt', function() {
    describe('#compute()', function() {
        it('Basic usage', function(done) {
            var d = new dhont();
            d.setMandates(8);
            var votes = [];

            DB.getResultadoByAnio(1977,function(data){
                var i, len = data.length;
                for(i = 0; i < len; i++){
                    _.prettyPrint('Calculando ' + data[i].provincia);
                    for (var key in data[i].partidos) {
                        votes.push(data[i].partidos[key]);
                    }
                    d.setVotes(votes);
                    d.compute();
                    votes = [];
                }

                done();
            });

        });
    });
});