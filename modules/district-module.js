/* jshint esversion: 6 */

const Result = require('../models/result');
/**
 * Utilities for a district
 * @module district-module
 */
(function () {

    function compute(votes, names, options,withTable) {
        return calculateSeats(votes, names, options.mandates, options.blankVotes, options.percentage, withTable);
    }

    function isInt(value) {
        let x;
        return isNaN(value) ? !1 : (x = parseFloat(value), (0 | x) === x);
    }

    function calculateTotalVotes(votes, blankVotes) {
        let total = parseInt(blankVotes);
        for (let i = 0, len = votes.length; i < len; ++i) {
            total = parseInt(votes[i]) + total;
        }
        return total;
    }

    function validateParties(numberOfParties, minNumberOfVotes, votes, names, validatedVotes, validatedNames) {
        let numberOfPartiesValidated = 0;
        for (let i = 0; i < numberOfParties; ++i) {
            if (votes[i] >= minNumberOfVotes) {
                validatedVotes[numberOfPartiesValidated] = votes[i];
                validatedNames[numberOfPartiesValidated] = names[i];
                numberOfPartiesValidated++;
            }
        }
        return numberOfPartiesValidated;
    }

    function newSeat(votos, esc, num_par) {
        let imax = 0, ct, max = 0;
        for (ct = 0; ct < num_par; ++ct) {
            if (max < (votos[ct] / (esc[ct] + 1))) {
                max = votos[ct] / (esc[ct] + 1);
                imax = ct;
            }
        }
        return imax;
    }

    function fillSeats(mandates, seats, validatedVotes, numberOfPartiesValidated) {
        let table = [];
        for (let i = 0; i < mandates; ++i) {
            seats[newSeat(validatedVotes, seats, numberOfPartiesValidated)]++;
            table.push(seats.slice());
        }
        return table;
    }

    function fillPartiesResult(numberOfPartiesValidated, result, validatedNames, seats) {
        for (let i = 0; i < numberOfPartiesValidated; ++i) {
            result.parties[validatedNames[i]] = seats[i];
        }
    }

    function calculateSeats(votes, names, mandates, blankVotes, percentage,withTable) {
        let numberOfParties = votes.length,
            numberOfVotes = calculateTotalVotes(votes, blankVotes),
            minNumberOfVotes = Math.ceil(numberOfVotes * percentage / 100),
            result = fillResultVar(numberOfVotes,minNumberOfVotes),
            seats, numberOfPartiesValidated, validatedVotes = [], validatedNames = [];

        numberOfPartiesValidated = validateParties(numberOfParties, minNumberOfVotes, votes, names, validatedVotes, validatedNames);
        seats = new Array(numberOfPartiesValidated).fill(0);
        let table = fillSeats(mandates, seats, validatedVotes, numberOfPartiesValidated);
        fillPartiesResult(numberOfPartiesValidated, result, validatedNames, seats);
        if(withTable) {
            result.table = fillTable(table,validatedNames);
        }
        return result;
    }
    function fillResultVar(numberOfVotes,minNumberOfVotes){
        return {
            numberOfVotes: numberOfVotes,
                minNumberOfVotes: minNumberOfVotes,
            parties: {}
        };
    }
    function fillTable(table,validatedNames){
        let aux;
        for (let i = 0, len = table.length; i < len; i++) {
            for (let j = 0, fil_len = table[i].length; j < fil_len; j++) {
                aux = table[i][j];
                table[i][j] = {};
                table[i][j][validatedNames[j]] = aux;
            }
        }
        return table;
    }

    function createResultEntity(args) {
        let lines = args[0].split('\n'),
            partidos = {}, aux;
        for (let i = 0, len = lines.length; i < len; i++) {
            aux = lines[i].split(' ');
            partidos[aux[0].replace(/(\r\n|\n|\r)/gm, "")] = aux[2].replace(/(\r\n|\n|\r)/gm, "");
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
    }

    function addPopulation(populations){
        let population = 0;
        for(let i=0,len=populations.length; i< len; ++i)
            population += populations[i];
        return population;
    }

    function howManyMandates(totalPopulation,districtPopulation,totalMandates,district){
        if(district === 'Ceuta' || district === 'Melilla') return 1;
        let numberOfMandates = 2;
        let percentage = (districtPopulation / totalPopulation);
        numberOfMandates += Math.trunc(248*percentage);
        return numberOfMandates;
    }

    module.exports = {
        compute: compute,

        isInt: isInt,

        calculateTotalVotes: calculateTotalVotes,

        validateParties: validateParties,

        newSeat: newSeat,

        fillSeats: fillSeats,

        fillPartiesResult: fillPartiesResult,

        calculateSeats: calculateSeats,

        createResultEntity: createResultEntity,

        addPopulation: addPopulation,

        howManyMandates: howManyMandates
    };
})();
