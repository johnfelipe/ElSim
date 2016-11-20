'use strict';
const mongoose = require('mongoose'),
    Schema = mongoose.Schema;
/**
 * Log mongoose model
 * @module models/log
 */
module.exports = mongoose.model(
    'Log',
    new Schema({
        message: { type: String, required: true },
        date: { type: Date, required: true }
    })
);
