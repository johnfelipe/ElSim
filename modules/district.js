/* jshint esversion: 6 */

const Result = require('../models/result'),
    console = require('better-console');

/**
 *
 * @module district-module
 */
{

    const calculateTotalVotes = (votes, blankVotes) => {
        let total = parseInt(blankVotes);

        for (let v of votes) {
            total = parseInt(v) + total;
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
            if (max < (parseInt(votos[ct]) / (esc[ct] + 1))) {
                max = parseInt(votos[ct]) / (esc[ct] + 1);
                imax = ct;
            }
        }
        return imax;
    };

    const fillSeats = (mandates, seats, validatedVotes, numberOfPartiesValidated) => {
        let table = [];
        for (let i = 0; i < mandates; ++i) {
            seats[newSeat(validatedVotes, seats, numberOfPartiesValidated)]++;
            table.push([...seats]);
        }
        return table;
    };

    const fillPartiesResult = (numberOfPartiesValidated, result, validatedNames, seats) => {
        for (let i = 0; i < numberOfPartiesValidated; i++) {
            result.parties[validatedNames[i]] = seats[i];
        }
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

    const createResultEntity = (args) => {
        let lines = args[0].split('\n'),
            partidos = {}, aux;

        const regEx = new RegExp(/(\r\n|\n|\r)/gm);

        for (let line of lines) {
            aux = line.split(' ');
            partidos[aux[0].replace(regEx, "")] = aux[2].replace(regEx, "");
        }

        return new Result({
            comunidad: 'desconocida',
            cod_provincia: args[1],
            provincia: 'desconocida',
            poblacion: args[2],
            total_votantes: args[3],
            votos_validos: args[3] - args[4],
            votos_candidaturas: (args[3] - args[4]) - args[5],
            votos_blanco: args[5],
            votos_nulos: args[4],
            eleccion: {
                autor: args[6],
                fecha: args[7]
            },
            partidos: partidos
        });
    };

    const addPopulation = (populations) => {
        let population = 0;
        for (let p of populations) {
            population += p;
        }
        return population;
    };

    const compute = (votes, names, options, withTable) => {
        return calculateSeats(votes, names, options.mandates, options.blankVotes, options.percentage, withTable);
    };

    module.exports = {
        compute,

        calculateTotalVotes,

        validateParties,

        newSeat,

        fillSeats,

        fillPartiesResult,

        calculateSeats,

        createResultEntity,

        addPopulation
    };
}
