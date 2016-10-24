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
        name: { type: String, required: true },
        email: { type: String, required: true, index: { unique: true } },
        password: { type: String, required: true },
        admin: { type: Boolean, required: true },
        resultados: { type: [], required: false }
    })
);

