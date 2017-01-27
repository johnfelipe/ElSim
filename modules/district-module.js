/* jshint esversion: 6 */


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

    module.exports = {
        compute: compute,

        isInt: isInt,

        calculateTotalVotes: calculateTotalVotes,

        validateParties: validateParties,

        newSeat: newSeat,

        fillSeats: fillSeats,

        fillPartiesResult: fillPartiesResult,

        calculateSeats: calculateSeats
    };
})();
