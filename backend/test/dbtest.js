'use strict';
var app = require('./../app'),
    User = require('./../models/user'),
    Resultado = require('./../models/resultado'),
    should = require('chai').should(),
    expect = require('chai').expect,
    superagent = require('superagent'),
    http = require('http'),
    request = require('request');

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
                admin: true,
                resultados: []
            });
            user.save(function(error, user){
                if(error) should.exist(error);
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
        it('Should not save if duplicate key(cod_provincia + eleccion)', function(done) {
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
                eleccion: {autor: 'sistema', fecha: new Date(1977,5,1) },
                partidos: { }
            });
            resultado.save(function(error, resultado){
                if(error) should.exist(error);
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

    it('POST /api/authenticate with demo@demo.com should return a token',function(done){
        request.post('http://localhost:3000/api/authenticate',
            {
                form : {
                    email : 'demo@demo.com',
                    password : 'password'
                }
            },
            function (err, res, body){
                expect(res.body.includes('token')).to.equal(true);
                done();
            }
        );
    });

});