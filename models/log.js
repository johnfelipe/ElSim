


/** Log mongoose model */
const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const Q = require('q');
mongoose.Promise = Q.Promise;

let LogSchema = new Schema({
    message: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
});


module.exports = mongoose.model('Log',LogSchema);
