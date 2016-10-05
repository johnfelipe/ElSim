'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
 * Modelo mongoose para usuarios
 */
module.exports = mongoose.model('User', new Schema({
    name: String,
    email: String,
    password: String,
    admin: Boolean
}));