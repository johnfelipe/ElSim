'use strict';

/**
 * User mongoose model
 * @module models/user
 */
const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt-nodejs');

let s = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, index: {unique: true}},
    password: {type: String, required: true},
    born: {type: Date, required: false},
    admin: {type: Boolean, required: true},
    resultados: {type: [], required: false},
    apiUsage: {type:{},required:false}
});

/** Generates the hash for bcrypt */
s.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

/** Checks password */
s.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', s);

