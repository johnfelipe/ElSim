/* jshint esversion: 6 */
'use strict';

/** Questions mongoose model */
const mongoose = require('mongoose'),
    Schema = mongoose.Schema;
const Q = require('q');
mongoose.Promise = Q.Promise;

let QuestionSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    answers: {
        type: [String],
        required: true
    },
    correct: {
        type: String,
        required: true
    }
});


/** @class Question */
module.exports = mongoose.model('Question', QuestionSchema);
