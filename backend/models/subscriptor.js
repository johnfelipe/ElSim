'use strict';
/**
 * Subscriptor mongoose model
 * @module models/subscriptor
 */
const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/** The schema for the model */
let s = new Schema({
    email: {
        type: String,
        required: true
    },
    options: {
        type: Object,
        required: true
    }
});

module.exports = mongoose.model('Log',s);
