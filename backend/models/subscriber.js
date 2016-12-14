/* jshint esversion: 6 */
'use strict';

/**
 * Subscriber mongoose model
 * @module models/subscriber
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

module.exports = mongoose.model('Subscriber',s);
