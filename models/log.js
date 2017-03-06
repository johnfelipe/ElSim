/* jshint esversion: 6 */
'use strict';

/** Log mongoose model */
const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

let s = new Schema({
    message: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
});

let Log = mongoose.model('Log',s);

/** @class Log */
module.exports = Log;
