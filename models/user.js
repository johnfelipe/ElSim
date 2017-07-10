const mongoose   = require('mongoose');
const Schema     = mongoose.Schema;
const bcrypt     = require('bcrypt-nodejs');
const Q          = require('q');
mongoose.Promise = Q.Promise;

let UserSchema = new Schema({
    name    : {type: String, required: true},
    email   : {type: String, required: true, index: {unique: true}},
    password: {type: String, required: true},
    phone   : {type: String, required: false},
    born    : {type: Date, required: false},
    admin   : {type: Boolean, required: true},
    results : {type: [], required: false}
});

/**
 * Generates the hash for bcrypt
 * @memberOf User
 */
UserSchema.methods.generateHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);

/**
 * Checks password
 * @memberOf User
 */
UserSchema.methods.validPassword = (password) => bcrypt.compareSync(password, this.password);

module.exports = mongoose.model('User', UserSchema);

