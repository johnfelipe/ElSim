/* jshint esversion: 6 */
'use strict';

/** Log mongoose model */
const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

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

/** @class Log */
module.exports = mongoose.model('Log',LogSchema);
