const Result = require('../models/result');
const moment = require('moment');
const Q      = require('q');

class Util {
    static electionIsInArray(obj, array) {
        for (let i = 0, len = array.length; i < len; i++) {
            if (array[i].author === obj.author && array[i].date === obj.date) {
                return true;
            }
        }
        return false;
    }

    static async calculateElections() {
        try {
            let data      = await Result.find({});
            let elections = [];

            for (let i = 0, len = data.length; i < len; i++) {
                if (!Util.electionIsInArray(data[i].election, elections)) {
                    elections.push(data[i].election);
                }
            }
            return {data, elections};
        } catch (err) {
            throw err;
        }
    }

    static sortByDate(a, b) {
        let f1, f2;
        if (typeof a.election !== 'undefined') {
            f1 = new moment(a.election.date);
            f2 = new moment(b.election.date);
        } else {
            f1 = new moment(a.date);
            f2 = new moment(b.date);
        }

        if (f1 > f2) {
            return 1;
        } else if (f1 < f2) {
            return -1;
        } else {
            return 0;
        }
    }
}
module.exports = Util;
