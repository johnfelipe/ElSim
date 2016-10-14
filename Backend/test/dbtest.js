'use strict';
var app = require('./../app');
var User = require('./../models/user');
var Resultado = require('./../models/resultado');
var should = require('chai').should(),
    expect = require('chai').expect;

var superagent = require('superagent');
var _ = require('./../routes/modules/utils_module');

var http = require('http');
var request = require('request');

/**
 * Test del modelo User
 */
describe('User', function() {
    describe('#save()', function() {
        it('Should not save if duplicate key(email)', function(done) {
            var user = new User({
                name: 'demo',
                email: 'demo@demo.com',
                password: 'password',
                admin: true
            });
            user.save(function(error, user){
                should.exist(error);
                done();
            });
        });
    });
});

/**
 * Test del modelo Resultado
 */
describe('Resultado',function() {
    describe('#save()', function() {
        it('Should not save if duplicate key(cod_provincia + anio)', function(done) {
            var resultado = new Resultado({
                comunidad: '',
                cod_provincia: 22,
                provincia: '',
                poblacion: 0,
                num_mesas: 0,
                total_censo_electoral: 0,
                total_votantes: 0,
                votos_validos: 0,
                votos_candidaturas: 0,
                votos_blanco: 0,
                votos_nulos: 0,
                anio: 1977,
                partidos: { }
            });
            resultado.save(function(error, resultado){
                should.exist(error);
                done();
            });
        });
    });
});


/**
 * Test de servidor, rutas, ...
 */
describe('HTTP methods and routes', function() {
    before(function () {
        app.listen(3000);
    });
    it('GET / should return 200',function(done){
        request.get('http://localhost:3000/', function (err, res, body){
            expect(res.statusCode).to.equal(200);
            done();
        });
    });
    it('GET /jiejio should return 404',function(done){
        request.get('http://localhost:3000/jiejio', function (err, res, body){
            expect(res.statusCode).to.equal(404);
            done();
        });
    });
});