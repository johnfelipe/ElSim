'use strict';

/**
 * User mongoose model
 * @module models/user
 */
const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

let s = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, index: {unique: true}},
    password: {type: String, required: true},
    admin: {type: Boolean, required: true},
    resultados: {type: [], required: false}
});

module.exports = mongoose.model('User', s);

