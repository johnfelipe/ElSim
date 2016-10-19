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
            var votes = [];
            DB.getResultadoByAnio(1996,function(data){
                var i, len = data.length;
                var cuota = dhont.calculateCuota(data);
                for(i = 0; i < len; i++){
                    data[i].mandates = dhont.calculateMandates(data[i],cuota);
                }
                dhont.fixMandates(data);


                for(i = 0; i < len; i++){

                    for (var key in data[i].partidos) {
                        votes.push(data[i].partidos[key]);
                    }

                    d.setMandates(data[i].mandates.entero);
                    d.setVotes(votes);
                    d.compute();
                    var j = 0;
                    for (var key in data[i].partidos) {
                        data[i].partidos[key] = {
                            'provincia': data[i].provincia,
                            'votos': data[i].partidos[key],
                            'escanios': d.getResults()[j]
                        };
                        j++;

                    }
                    _.prettyPrint(data[i].partidos);
                    votes = [];
                }


                done();
            });

        });
    });
});