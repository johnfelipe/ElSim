'use strict';
const app = require('./../app'),
    User = require('./../models/user'),
    Resultado = require('./../models/result'),
    should = require('chai').should(),
    expect = require('chai').expect,
    superagent = require('superagent'),
    http = require('http'),
    request = require('request'),
    bCrypt = require('bcrypt-nodejs');
let createHash = function (password) {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
};
/**
 * Test models
 * @module test/model-test
 */

describe('User', function () {
    describe('#save()', function () {
        it('Should not save if duplicate key(email)', function (done) {
            let user = new User({
                name: 'demo',
                email: 'demo@demo.com',
                password: createHash('password'),
                admin: true,
                resultados: []
            });
            user.save(function (error, user) {
                if (error) should.exist(error);
                done();
            });
        });
    });
});

describe('Result', function () {
    describe('#save()', function () {
        it('Should not save if duplicate key(cod_provincia + eleccion)', function (done) {
            let resultado = new Resultado({
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
                eleccion: {autor: 'sistema', fecha: new Date(1977, 5, 1)},
                partidos: {}
            });
            resultado.save(function (error, resultado) {
                if (error) should.exist(error);
                done();
            });
        });
    });
});


describe('HTTP methods and routes', function () {
    before(function () {
        app.listen(3000);
    });
    it('GET / route should return 200', function (done) {
        request.get('http://localhost:3000/', function (err, res, body) {
            expect(res.statusCode).to.equal(200);
            done();
        });
    });
    it('GET strange routes should return 404', function (done) {
        request.get('http://localhost:3000/jiejio', function (err, res, body) {
            expect(res.statusCode).to.equal(404);
            done();
        });
    });
});