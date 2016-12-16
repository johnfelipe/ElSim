/* jshint esversion: 6 */


/**
 * Utilities for a district
 * @module district-module
 */
(function () {

    function compute(votes, names, options) {
        let result = calculateSeats(votes, names, options.mandates, options.blankVotes, options.percentage);
        console.dir(result);
        return result;
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
        for (let i = 0; i < mandates; ++i) {
            seats[newSeat(validatedVotes, seats, numberOfPartiesValidated)]++;
        }
    }

    function fillPartiesResult(numberOfPartiesValidated, result, validatedNames, seats) {
        for (let i = 0; i < numberOfPartiesValidated; ++i) {
            result.parties[validatedNames[i]] = seats[i];
        }
    }

    function calculateSeats(votes, names, mandates, blankVotes, percentage) {
        let numberOfParties = votes.length,
            numberOfVotes = calculateTotalVotes(votes, blankVotes),
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

        numberOfPartiesValidated = validateParties(numberOfParties, minNumberOfVotes, votes, names, validatedVotes, validatedNames);
        seats = new Array(numberOfPartiesValidated).fill(0);
        fillSeats(mandates, seats, validatedVotes, numberOfPartiesValidated);
        fillPartiesResult(numberOfPartiesValidated, result, validatedNames, seats);
        return result;
    }

    module.exports = {
        /**
         * @description
         * @function
         */
        compute: compute,

        /**
         * @description
         * @function
         */
        isInt: isInt,

        /**
         * @description
         * @function
         */
        calculateTotalVotes: calculateTotalVotes,

        /**
         * @description
         * @function
         */
        validateParties: validateParties,

        /**
         * @description
         * @function
         */
        newSeat: newSeat,

        /**
         * @description
         * @function
         */
        fillSeats: fillSeats,

        /**
         * @description
         * @function
         */
        fillPartiesResult: fillPartiesResult,

        /**
         * @description
         * @function
         */
        calculateSeats: calculateSeats
    };
})();
