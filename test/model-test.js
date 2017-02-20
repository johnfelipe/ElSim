/* jshint esversion: 6 */
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

const createHash = (password) => {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
};

const checkDuplicateMail = (done) => {
    let user = new User({
        name: 'demo',
        email: 'demo@demo.com',
        password: createHash('password'),
        admin: true,
        resultados: []
    });
    user.save((error, user) => {
        if (error) {
            should.exist(error);
        }
        console.log(user);
        done();
    });
};

const startApp = () => {
    app.listen(3000);
};

const fineRoutes = (done) => {
    request.get('http://localhost:3000/', (err, res, body) => {
        expect(res.statusCode).to.equal(200);
        done();
    });
};

const strangeRoutes = (done) => {
    request.get('http://localhost:3000/jiejio', (err, res, body) => {
        expect(res.statusCode).to.equal(404);
        done();
    });
};

const checkDuplicateDistrict = (done) => {
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
    resultado.save((error, resultado) => {
        if (error) {
            should.exist(error);
        }
        console.log(resultado);
        done();
    });
};


/** Test models */
describe('User', () => {
    describe('#save()', () => {
        it('Should not save if duplicate key(email)', checkDuplicateMail);
    });
});

describe('Result', () => {
    describe('#save()', () => {
        it('Should not save if duplicate key(cod_provincia + eleccion)', checkDuplicateDistrict);
    });
});

describe('HTTP methods and routes', () => {
    before(startApp);

    it('GET / route should return 200', fineRoutes);

    it('GET strange routes should return 404', strangeRoutes);
});


