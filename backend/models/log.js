'use strict';
const mongoose = require('mongoose'),
    Schema = mongoose.Schema;
/**
 * Modelo para los logs
 * @type {any}
 */
module.exports = mongoose.model(
    'Log',
    new Schema({
        message: { type: String, required: true },
        date: { type: Date, required: true }
    })
);
