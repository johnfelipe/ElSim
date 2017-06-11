const chai = require('chai');
const expect = chai.expect;
const Chart = require('../../charts/chart');
const mongoose = require('mongoose');
const config = require('../../config');
const Q = require('q');
mongoose.connect(config.database);
mongoose.Promise = Q.Promise;
chai.should();

describe('Chart Main Module', () => {
    describe('getColor', () => {
        it('knownColor', () => {
            let knownColor = Chart.chooseColor('PODEMOS');
            knownColor.should.equal('#6B1F5F');
        });

        it('unknownColor', () => {
            let unknownColor = Chart.chooseColor('FakeParty');
            unknownColor.should.equal('blue');
        });

        it('calculateDistrict', () => {
            return Chart.calculateDistrict('column',
                '2',
                '2',
                '593c37b3097ada4142033c75',
                undefined
            )
                .then((result) => {
                    expect(result.result).to.eql({
                        numberOfVotes: 85555,
                        minNumberOfVotes: 1711,
                        parties: {'PSP-US': 0, AP: 0, PCE: 0, PSOE: 0, UCD: 2},
                        table: [[{'PSP-US': 0}, {AP: 0}, {PCE: 0}, {PSOE: 0}, {UCD: 1}],
                            [{'PSP-US': 0}, {AP: 0}, {PCE: 0}, {PSOE: 0}, {UCD: 2}]]
                    });
                });
        });

        const someElection = {
            resultSelected: '1977-06-01,sistema',
            percentage: '0',
            almeria: '6',
            cadiz: '9',
            cordoba: '6',
            granada: '7',
            huelva: '5',
            jaen: '5',
            malaga: '11',
            sevilla: '12',
            huesca: '3',
            teruel: '3',
            zaragoza: '7',
            asturias: '8',
            albacete: '4',
            ciudadreal: '5',
            cuenca: '3',
            guadalajara: '3',
            toledo: '6',
            illesbalears: '8',
            avila: '3',
            burgos: '4',
            leon: '4',
            palencia: '3',
            salamanca: '4',
            segovia: '3',
            soria: '3',
            valladolid: '5',
            zamora: '3',
            laspalmas: '8',
            santacruzdetenerife: '7',
            cantabria: '5',
            barcelona: '31',
            girona: '6',
            lleida: '4',
            tarragona: '6',
            caceres: '4',
            badajoz: '6',
            'acoruña': '8',
            lugo: '4',
            ourense: '4',
            pontevedra: '7',
            madrid: '36',
            navarra: '5',
            alava: '4',
            gipuzkoa: '6',
            bizkaia: '8',
            murcia: '10',
            larioja: '4',
            alicante: '12',
            castellon: '5',
            valencia: '16',
            ceuta: '1',
            melilla: '1'
        };

        it('calculateCountry', () => {
            return Chart.calculateCountry(
                '1977-06-01,sistema',
                '0',
                undefined,
                someElection
            ).then((result) => {
                expect(result.global).to.be.an('Array').that.is.not.empty;
            });
        });

        it('calculateCountry (With Communities)', () => {
            someElection.aggregateCommunities = 'on';
            return Chart.calculateCountry(
                '1977-06-01,sistema',
                '0',
                undefined,
                someElection
            ).then((result) => {
                expect(result.global).to.be.an('Object');
            });
        });

        it('calculateCountry (Whole Country)', () => {
            someElection.wholeCountry = 'on';
            return Chart.calculateCountry(
                '1977-06-01,sistema',
                '0',
                undefined,
                someElection
            ).then((result) => {
                expect(result.global).to.be.an('Object');
            });
        });

        it('calculateCountry (Bad Input)', () => {
            return Chart.calculateCountry(
                'FAKE INPUT'
            ).then((result) => {
                expect(result).to.eql({
                    user: undefined,
                    global: [],
                    wholeCountry: false,
                    communities: false,
                    title: 'Country Chart'
                });
            });
        });
    });
});