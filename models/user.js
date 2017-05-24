

/** User mongoose model */
const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt-nodejs');

const Q = require('q');
mongoose.Promise = Q.Promise;
let UserSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, index: {unique: true}},
    password: {type: String, required: true},
    phone: {type: String, required: false},
    born: {type: Date, required: false},
    admin: {type: Boolean, required: true},
    resultados: {type: [], required: false}
});

/**
 * Generates the hash for bcrypt
 * @memberOf User
 */
UserSchema.methods.generateHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

/**
 * Checks password
 * @memberOf User
 */
UserSchema.methods.validPassword = (password) => {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);

