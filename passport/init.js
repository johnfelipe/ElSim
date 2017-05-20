/* jshint esversion: 6 */
'use strict';
const Login = require('./login'),
    SingUp = require('./signup'),
    User = require('../models/user');

class InitAuth {

    constructor(passport) {
        this.passport = passport;
        this.passport.serializeUser(InitAuth.serializeUser);
        this.passport.deserializeUser(this.deserializeUser);
        this.login = new Login(passport);
        this.singnup = new SingUp(passport);
    }

    /** Serialize an user */
    static serializeUser(user, done) {
        return done(null, user._id);
    }

    /** Deserialize an user */
    deserializeUser(id, done) {
        User.findById(id)
            .then((user) => done(null, user))
            .catch((err) => done(err, null));
    }
}
module.exports = InitAuth;