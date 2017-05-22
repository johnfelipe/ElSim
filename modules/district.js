

const Result = require('../models/result'),
    console = require('better-console');

class District {

    constructor(votes, names, options, withTable) {
        this.votes = votes;
        this.names = names;
        this.options = options;
        this.withTable = withTable;
    }

    calculateTotalVotes(votes, blankVotes) {
        let total = parseInt(blankVotes);

        for (let v of votes) {
            total = parseInt(v) + total;
        }

        return total;
    }

    validateParties(numberOfParties, minNumberOfVotes, votes, names, validatedVotes, validatedNames) {
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

    newSeat(votos, esc, num_par) {
        let imax = 0, ct, max = 0;
        for (ct = 0; ct < num_par; ++ct) {
            if (max < (parseInt(votos[ct]) / (esc[ct] + 1))) {
                max = parseInt(votos[ct]) / (esc[ct] + 1);
                imax = ct;
            }
        }
        return imax;
    }

    fillSeats(mandates, seats, validatedVotes, numberOfPartiesValidated) {
        let table = [];
        for (let i = 0; i < mandates; ++i) {
            seats[this.newSeat(validatedVotes, seats, numberOfPartiesValidated)]++;
            table.push([...seats]);
        }
        return table;
    }

    fillPartiesResult(numberOfPartiesValidated, result, validatedNames, seats) {
        for (let i = 0; i < numberOfPartiesValidated; i++) {
            result.parties[validatedNames[i]] = seats[i];
        }
    }

    fillResultVar(numberOfVotes, minNumberOfVotes) {
        return {
            numberOfVotes: numberOfVotes,
            minNumberOfVotes: minNumberOfVotes,
            parties: {}
        };
    }

    fillTable(table, validatedNames) {
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

    calculateSeats(votes, names, mandates, blankVotes, percentage, withTable) {
        let numberOfParties = votes.length,
            numberOfVotes = this.calculateTotalVotes(votes, blankVotes),
            minNumberOfVotes = Math.floor(numberOfVotes * percentage / 100),
            result = this.fillResultVar(numberOfVotes, minNumberOfVotes),
            seats, numberOfPartiesValidated, validatedVotes = [], validatedNames = [];

        numberOfPartiesValidated = this.validateParties(numberOfParties, minNumberOfVotes, votes, names, validatedVotes, validatedNames);

        seats = new Array(numberOfPartiesValidated).fill(0);

        let table = this.fillSeats(mandates, seats, validatedVotes, numberOfPartiesValidated);

        this.fillPartiesResult(numberOfPartiesValidated, result, validatedNames, seats);

        if (withTable) {
            result.table = this.fillTable(table, validatedNames);
        }

        return result;
    }

    static createResultEntity(result) {
        let lines = result.votes.split('\n'),
            partidos = {}, aux;

        const regEx = new RegExp(/(\r\n|\n|\r)/gm);

        for (let line of lines) {
            aux = line.split(' ');
            partidos[aux[0].replace(regEx, "")] = aux[2].replace(regEx, "");
        }

        let sObject = {
            comunidad: result.comunidad,
            cod_provincia: result.cod_province,
            provincia: result.province,
            poblacion: result.population,
            total_votantes: result.census,
            votos_validos: result.census - result.nulos,
            votos_candidaturas: (result.census - result.nulos) - result.blancos,
            votos_blanco: result.blancos,
            votos_nulos: result.nulos,
            eleccion: {
                autor: result.author,
                fecha: result.date
            },
            partidos: partidos
        };

        console.warn('Intentando crear:');
        console.warn(sObject);

        return new Result(sObject);
    }

    compute() {
        return this.calculateSeats(
            this.votes,
            this.names,
            this.options.mandates,
            this.options.blankVotes,
            this.options.percentage,
            this.withTable
        );
    }
}
module.exports = District;
