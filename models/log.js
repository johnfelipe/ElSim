/* jshint esversion: 6 */
'use strict';

/**
 * Log mongoose model
 * @module models/log
 */
const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/** The schema for the model */
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

module.exports = mongoose.model('Log',s);