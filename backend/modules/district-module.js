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

    new_seat: function (votos, esc, num_par) {
        let imax = 0, ct, max = 0;

        for (ct = 0; ct < num_par; ++ct) {
            if (max < (votos[ct] / (esc[ct] + 1))) {
                max = votos[ct] / (esc[ct] + 1);
                imax = ct;
            }
        }
        return imax;
    },

    calculate_seats: function (votes, names, mandates, blankVotes, percentage) {
        let numberOfParties = votes.length,
            i,
            numberOfVotes = Number(blankVotes),
            seats = [],
            minNumberOfVotes,
            result = {
                numberOfVotes: 0,
                minNumberOfVotes: 0,
                parties: {}
            },
            numberOfPartiesValidated = 0,
            validatedVotes = [],
            validatedNames = [];

        for (i = 0; i < numberOfParties; i++) {
            numberOfVotes = votes[i] + numberOfVotes;
        }

        result.numberOfVotes = numberOfVotes;
        minNumberOfVotes = Math.ceil(numberOfVotes * percentage / 100);
        result.minNumberOfVotes = minNumberOfVotes;

        for (i = 0; i < numberOfParties; i++) {
            if (votes[i] >= minNumberOfVotes) {
                validatedVotes[numberOfPartiesValidated] = votes[i];
                validatedNames[numberOfPartiesValidated] = names[i];
                numberOfPartiesValidated++;
            }
        }

        for (i = 0; i < numberOfPartiesValidated; i++) {
            seats[i] = 0;
        }
        for (i = 0; i < mandates; i++) {
            seats[this.new_seat(validatedVotes, seats, numberOfPartiesValidated)]++;
        }

        for (i = 0; i < numberOfPartiesValidated; i++) {
            result.parties[validatedNames[i]] = seats[i];
        }
        console.log(result);

    }
};
