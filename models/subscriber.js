/* jshint esversion: 6 */
'use strict';

/** Subscriber mongoose model */
const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

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


/** @class Subscriber */
module.exports = mongoose.model('Subscriber', s);
