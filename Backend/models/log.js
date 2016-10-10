'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
/**
 * Modelo para los logs
 * @type {any}
 */
module.exports = mongoose.model(
    'Log',
    new Schema({
        message: String,
        date: Date
    })
);