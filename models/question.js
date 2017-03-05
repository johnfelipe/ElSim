/* jshint esversion: 6 */
'use strict';

/** Questions mongoose model */
const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

let s = new Schema({
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

module.exports = mongoose.model('Question', s);
