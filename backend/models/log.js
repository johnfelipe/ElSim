'use strict';
/**
 * Log mongoose model
 * @module models/log
 */

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

module.exports = mongoose.model('Log',s);
