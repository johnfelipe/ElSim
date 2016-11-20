'use strict';
const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * User mongoose model
 * @module models/user
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

