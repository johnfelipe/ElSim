/* jshint esversion: 6 */

const Result = require('../models/result'),
    console = require('better-console');

/**
 *
 * @module district-module
 */
(function () {

    const compute = (votes, names, options, withTable) => {
        return calculateSeats(votes, names, options.mandates, options.blankVotes, options.percentage, withTable);
    };

    const isInt = (value) => {
        let x;
        return isNaN(value) ? !1 : (x = parseFloat(value), (0 | x) === x);
    };

    const calculateTotalVotes = (votes, blankVotes) => {
        let total = parseInt(blankVotes);
        for (let i = 0, len = votes.length; i < len; ++i) {
            total = parseInt(votes[i]) + total;
        }
        return total;
    };

    const validateParties = (numberOfParties, minNumberOfVotes, votes, names, validatedVotes, validatedNames) => {
        let numberOfPartiesValidated = 0;
        for (let i = 0; i < numberOfParties; ++i) {
            if (votes[i] >= minNumberOfVotes) {
                validatedVotes[numberOfPartiesValidated] = votes[i];
                validatedNames[numberOfPartiesValidated] = names[i];
                numberOfPartiesValidated++;
            }
        }
        return numberOfPartiesValidated;
    };

    const newSeat = (votos, esc, num_par) => {
        let imax = 0, ct, max = 0;
        for (ct = 0; ct < num_par; ++ct) {
            if (max < (votos[ct] / (esc[ct] + 1))) {
                max = votos[ct] / (esc[ct] + 1);
                imax = ct;
            }
        }
        return imax;
    };

    const fillSeats = (mandates, seats, validatedVotes, numberOfPartiesValidated) => {
        let table = [];
        for (let i = 0; i < mandates; ++i) {
            seats[newSeat(validatedVotes, seats, numberOfPartiesValidated)]++;
            table.push(seats.slice());
        }
        return table;
    };

    const fillPartiesResult = (numberOfPartiesValidated, result, validatedNames, seats) => {
        for (let i = 0; i < numberOfPartiesValidated; ++i) {
            result.parties[validatedNames[i]] = seats[i];
        }
    };

    const calculateSeats = (votes, names, mandates, blankVotes, percentage, withTable) => {

        let numberOfParties = votes.length,
            numberOfVotes = calculateTotalVotes(votes, blankVotes),
            minNumberOfVotes = Math.floor(numberOfVotes * percentage / 100),
            result = fillResultVar(numberOfVotes, minNumberOfVotes),
            seats, numberOfPartiesValidated, validatedVotes = [], validatedNames = [];

        numberOfPartiesValidated = validateParties(numberOfParties, minNumberOfVotes, votes, names, validatedVotes, validatedNames);
        seats = new Array(numberOfPartiesValidated).fill(0);
        let table = fillSeats(mandates, seats, validatedVotes, numberOfPartiesValidated);
        fillPartiesResult(numberOfPartiesValidated, result, validatedNames, seats);
        if (withTable) {
            result.table = fillTable(table, validatedNames);
        }

        return result;
    };

    const fillResultVar = (numberOfVotes, minNumberOfVotes) => {
        return {
            numberOfVotes: numberOfVotes,
            minNumberOfVotes: minNumberOfVotes,
            parties: {}
        };
    };

    const fillTable = (table, validatedNames) => {
        let aux;
        for (let i = 0, len = table.length; i < len; i++) {
            for (let j = 0, fil_len = table[i].length; j < fil_len; j++) {
                aux = table[i][j];
                table[i][j] = {};
                table[i][j][validatedNames[j]] = aux;
            }
        }
        return table;
    };

    const createResultEntity = (args) => {
        let lines = args[0].split('\n'),
            partidos = {}, aux;

        const regEx = new RegExp(/(\r\n|\n|\r)/gm);

        for (let i = 0, len = lines.length; i < len; i++) {
            aux = lines[i].split(' ');
            partidos[aux[0].replace(regEx, "")] = aux[2].replace(regEx, "");
        }

        return new Result({
            comunidad: 'desconocida',
            cod_provincia: args[1],
            provincia: 'desconocida',
            poblacion: args[2],
            num_mesas: args[3],
            total_censo_electoral: args[4],
            total_votantes: args[5],
            votos_validos: args[5] - args[6],
            votos_candidaturas: (args[5] - args[6]) - args[7],
            votos_blanco: args[7],
            votos_nulos: args[6],
            eleccion: {
                autor: args[8],
                fecha: args[9]
            },
            partidos: partidos
        });
    };

    const addPopulation = (populations) => {
        let population = 0;
        for (let i = 0, len = populations.length; i < len; ++i) {
            population += populations[i];
        }
        return population;
    };

    const howManyMandates = (totalPopulation, districtPopulation, totalMandates, district) => {
        if (district === 'Ceuta' || district === 'Melilla') {
            return 1;
        }
        let percentage = (districtPopulation / totalPopulation);
        let numberOfMandates = Math.floor((totalMandates - 52) * percentage);
        return numberOfMandates + 2;
    };


    module.exports = {
        compute,

        isInt,

        calculateTotalVotes,

        validateParties,

        newSeat,

        fillSeats,

        fillPartiesResult,

        calculateSeats,

        createResultEntity,

        addPopulation,

        howManyMandates
    };
})();
