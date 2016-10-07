'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
 * Modelo para un usuario del sistema
 * @type {any}
 */
module.exports = mongoose.model(
    'User',
    new Schema({
        name: String,
        email: String,
        password: String,
        admin: Boolean
    })
);

