const chai     = require('chai');
const expect   = chai.expect;
const Chart    = require('../charts/chart');
const mongoose = require('mongoose');
const config   = require('../config');
const Q        = require('q');
mongoose.connect(config.database);
mongoose.Promise = Q.Promise;
chai.should();
const someElection = {
    resultSelected     : '1977-06-01,sistema',
    percentage         : '0',
    almeria            : '6',
    cadiz              : '9',
    cordoba            : '6',
    granada            : '7',
    huelva             : '5',
    jaen               : '5',
    malaga             : '11',
    sevilla            : '12',
    huesca             : '3',
    teruel             : '3',
    zaragoza           : '7',
    asturias           : '8',
    albacete           : '4',
    ciudadreal         : '5',
    cuenca             : '3',
    guadalajara        : '3',
    toledo             : '6',
    illesbalears       : '8',
    avila              : '3',
    burgos             : '4',
    leon               : '4',
    palencia           : '3',
    salamanca          : '4',
    segovia            : '3',
    soria              : '3',
    valladolid         : '5',
    zamora             : '3',
    laspalmas          : '8',
    santacruzdetenerife: '7',
    cantabria          : '5',
    barcelona          : '31',
    girona             : '6',
    lleida             : '4',
    tarragona          : '6',
    caceres            : '4',
    badajoz            : '6',
    'acoruña'          : '8',
    lugo               : '4',
    ourense            : '4',
    pontevedra         : '7',
    madrid             : '36',
    navarra            : '5',
    alava              : '4',
    gipuzkoa           : '6',
    bizkaia            : '8',
    murcia             : '10',
    larioja            : '4',
    alicante           : '12',
    castellon          : '5',
    valencia           : '16',
    ceuta              : '1',
    melilla            : '1'
};

describe('Country', () => {
    it('calculateCountry', (done) => {
        (async () => {
            try {
                let result = await Chart.calculateCountry(
                    '1977-06-01,sistema',
                    '0',
                    undefined,
                    someElection
                );
                expect(result.global).to.be.an('Array').that.is.not.empty;
                done();
            } catch (err) {
                done(err);
            }
        })();
    });

    it('calculateCountry (With Communities)', (done) => {

        (async () => {
            try {
                someElection.aggregateCommunities = 'on';

                let result = await Chart.calculateCountry(
                    '1977-06-01,sistema',
                    '0',
                    undefined,
                    someElection
                );
                expect(result.global).to.be.an('Object');
                done();
            } catch (err) {
                done(err);
            }
        })();
    });

    it('calculateCountry (Whole Country)', (done) => {

        (async () => {
            try {
                someElection.wholeCountry = 'on';

                let result = await Chart.calculateCountry(
                    '1977-06-01,sistema',
                    '0',
                    undefined,
                    someElection
                );

                expect(result.global).to.be.an('Object');
                done();
            } catch (err) {
                done(err);
            }
        })();
    });

    it('calculateCountry (Bad Input)', (done) => {

        (async () => {
            try {
                let result = await Chart.calculateCountry('FAKE INPUT');

                expect(result).to.eql({
                    user        : undefined,
                    global      : [],
                    wholeCountry: false,
                    communities : false,
                    title       : 'Country Chart'
                });
                done();
            } catch (err) {
                done(err);
            }
        })();

    });
});

