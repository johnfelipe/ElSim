'use strict';

/**
 * Utilities for a district
 * @module modules/district-module
 */
module.exports = {

    /** Calculate the result of a district */
    compute: function (votes, mandates) {
        return 0;
    },

    /** Calculate the total number of votes including blank votes */
    calculateTotalVotes: function (votes, blankVotes) {
        let total = Number(blankVotes);
        for (let i = 0, len = votes.length; i < len; ++i) {
            total = votes[i] + total;
        }
        return total;
    },

    /** */
    validateParties: function (numberOfParties, minNumberOfVotes, votes, names, validatedVotes, validatedNames) {
        let numberOfPartiesValidated = 0;
        for (let i = 0; i < numberOfParties; i++) {
            if (votes[i] >= minNumberOfVotes) {
                validatedVotes[numberOfPartiesValidated] = votes[i];
                validatedNames[numberOfPartiesValidated] = names[i];
                numberOfPartiesValidated++;
            }
        }
        return numberOfPartiesValidated;
    },

    /** */
    newSeat: function (votos, esc, num_par) {
        let imax = 0, ct, max = 0;
        for (ct = 0; ct < num_par; ++ct) {
            if (max < (votos[ct] / (esc[ct] + 1))) {
                max = votos[ct] / (esc[ct] + 1);
                imax = ct;
            }
        }
        return imax;
    },

    /** */
    fillSeats: function (mandates, seats, validatedVotes, numberOfPartiesValidated) {
        for (let i = 0; i < mandates; i++) {
            seats[this.newSeat(validatedVotes, seats, numberOfPartiesValidated)]++;
        }
    },

    /** */
    fillPartiesResult: function (numberOfPartiesValidated, result, validatedNames, seats) {
        for (let i = 0; i < numberOfPartiesValidated; i++) {
            result.parties[validatedNames[i]] = seats[i];
        }
    },

    /**
     * Main function of the module.
     * @param votes
     * @param names
     * @param mandates
     * @param blankVotes
     * @param percentage
     * @return {{numberOfVotes: *, minNumberOfVotes: number, parties: {}}}
     */
    calculateSeats: function (votes, names, mandates, blankVotes, percentage) {
        let numberOfParties = votes.length,
            numberOfVotes = this.calculateTotalVotes(votes, blankVotes),
            seats,
            minNumberOfVotes = Math.ceil(numberOfVotes * percentage / 100),
            result = {
                numberOfVotes: numberOfVotes,
                minNumberOfVotes: minNumberOfVotes,
                parties: {}
            },
            numberOfPartiesValidated,
            validatedVotes = [],
            validatedNames = [];

        numberOfPartiesValidated = this.validateParties(numberOfParties, minNumberOfVotes, votes, names, validatedVotes, validatedNames);
        seats = new Array(numberOfPartiesValidated).fill(0);
        this.fillSeats(mandates, seats, validatedVotes, numberOfPartiesValidated);
        this.fillPartiesResult(numberOfPartiesValidated, result, validatedNames, seats);

        console.log(result);
        return result;
    }
};
