const mongoose   = require('mongoose');
const Schema     = mongoose.Schema;
const Q          = require('q');
mongoose.Promise = Q.Promise;

let QuestionSchema = new Schema({
    title  : {
        type    : String,
        required: true
    },
    answers: {
        type    : [String],
        required: true
    },
    correct: {
        type    : String,
        required: true
    }
});

module.exports = mongoose.model('Question', QuestionSchema);
