/* jshint esversion: 6 */
'use strict';
let LocalStrategy = require('passport-local').Strategy,
    User = require('../models/user'),
    bCrypt = require('bcrypt-nodejs');

class Login {

    constructor(passport) {
        this.passReq = {
            passReqToCallback: true
        };
        this.passport = passport;
        this.passport.use('login', new LocalStrategy(this.passReq, this.strategyCallback));
    }

    strategyCallback(req, username, password, done) {
        User.findOne({email: username})
            .then((user) => {
                if (!user) {
                    return done(null, false, req.flash('message', 'User Not found.'));
                }
                if (!Login.isValidPassword(user, password)) {
                    return done(null, false, req.flash('message', 'Invalid Password'));
                }
                return done(null, user);
            })
            .catch((err) => {
                console.error(err);
                return done(err);
            });
    }

    static isValidPassword(user, password) {
        return bCrypt.compareSync(password, user.password);
    }
}
module.exports = Login;