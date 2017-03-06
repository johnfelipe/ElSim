/* jshint esversion: 6 */
'use strict';

/** User mongoose model */
const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt-nodejs');

let s = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, index: {unique: true}},
    password: {type: String, required: true},
    born: {type: Date, required: false},
    admin: {type: Boolean, required: true},
    resultados: {type: [], required: false}
});

/**
 * Generates the hash for bcrypt
 * @memberOf User
 */
s.methods.generateHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

/**
 * Checks password
 * @memberOf User
 */
s.methods.validPassword = (password) => {
    return bcrypt.compareSync(password, this.password);
};

/** @class User */
let User = mongoose.model('User', s);

module.exports = User;

