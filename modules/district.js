const Result = require('../models/result');
const console = require('better-console');

/** Class to handle a district simulation. */
class District {
    /**
     *
     * @param votes
     * @param names
     * @param options
     * @param withTable
     */
    constructor(votes, names, options, withTable) {
        this.votes = votes;
        this.names = names;
        this.options = options;
        this.withTable = withTable;
    }

    /**
     *
     * @param votes
     * @param blankVotes
     * @return {Number}
     */
    calculateTotalVotes(votes, blankVotes) {
        let total = parseInt(blankVotes);

        for (let v of votes) {
            total = parseInt(v) + total;
        }

        return total;
    }

    /**
     *
     * @param numberOfParties
     * @param minNumberOfVotes
     * @param votes
     * @param names
     * @param validatedVotes
     * @param validatedNames
     * @return {number}
     */
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

    /**
     *
     * @param votes
     * @param esc
     * @param num_par
     * @return {number}
     */
    newSeat(votes, esc, num_par) {
        let imax = 0, ct, max = 0;
        for (ct = 0; ct < num_par; ++ct) {
            if (max < (parseInt(votes[ct]) / (esc[ct] + 1))) {
                max = parseInt(votes[ct]) / (esc[ct] + 1);
                imax = ct;
            }
        }
        return imax;
    }

    /**
     *
     * @param mandates
     * @param seats
     * @param validatedVotes
     * @param numberOfPartiesValidated
     * @return {Array}
     */
    fillSeats(mandates, seats, validatedVotes, numberOfPartiesValidated) {
        let table = [];
        for (let i = 0; i < mandates; ++i) {
            seats[this.newSeat(validatedVotes, seats, numberOfPartiesValidated)]++;
            table.push([...seats]);
        }
        return table;
    }

    /**
     *
     * @param numberOfPartiesValidated
     * @param result
     * @param validatedNames
     * @param seats
     */
    fillPartiesResult(numberOfPartiesValidated, result, validatedNames, seats) {
        for (let i = 0; i < numberOfPartiesValidated; i++) {
            result.parties[validatedNames[i]] = seats[i];
        }
    }

    /**
     *
     * @param numberOfVotes
     * @param minNumberOfVotes
     * @return {{numberOfVotes: *, minNumberOfVotes: *, parties: {}}}
     */
    fillResultVar(numberOfVotes, minNumberOfVotes) {
        return {
            numberOfVotes,
            minNumberOfVotes,
            parties: {}
        };
    }

    /**
     *
     * @param table
     * @param validatedNames
     * @return {*}
     */
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

    /**
     *
     * @param votes
     * @param names
     * @param mandates
     * @param blankVotes
     * @param percentage
     * @param withTable
     * @return {{numberOfVotes: *, minNumberOfVotes: *, parties: {}}}
     */
    calculateSeats(votes, names, mandates, blankVotes, percentage, withTable) {
        let numberOfParties = votes.length;
        let numberOfVotes = this.calculateTotalVotes(votes, blankVotes);
        let minNumberOfVotes = Math.floor(numberOfVotes * percentage / 100);
        let result = this.fillResultVar(numberOfVotes, minNumberOfVotes);
        let seats, numberOfPartiesValidated, validatedVotes = [], validatedNames = [];

        numberOfPartiesValidated = this.validateParties(numberOfParties, minNumberOfVotes, votes, names, validatedVotes, validatedNames);

        seats = new Array(numberOfPartiesValidated).fill(0);

        let table = this.fillSeats(mandates, seats, validatedVotes, numberOfPartiesValidated);

        this.fillPartiesResult(numberOfPartiesValidated, result, validatedNames, seats);

        if (withTable) {
            result.table = this.fillTable(table, validatedNames);
        }

        return result;
    }

    /**
     *
     * @param result
     * @return {*}
     */
    static createResultEntity(result) {
        let lines = result.votes.split('\n'),
            parties = {}, aux;

        const regEx = new RegExp(/(\r\n|\n|\r)/gm);

        for (let line of lines) {
            aux = line.split(' ');
            parties[aux[0].replace(regEx, "")] = aux[2].replace(regEx, "");
        }

        let sObject = {
            community: result.community,
            cod_province: result.cod_province,
            province: result.province,
            population: result.population,
            total_voters: result.census,
            valid_votes: result.census - result.nulls,
            votes_to_parties: (result.census - result.nulls) - result.blanks,
            blank_votes: result.blanks,
            null_votes: result.nulls,
            election: {
                author: result.author,
                date: result.date
            },
            parties
        };

        console.warn('Intentando crear:');
        console.warn(sObject);

        return new Result(sObject);
    }

    /**
     *
     * @return {{numberOfVotes: *, minNumberOfVotes: *, parties: {}}}
     */
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
