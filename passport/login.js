/* jshint esversion: 6 */
'use strict';
let LocalStrategy = require('passport-local').Strategy,
    User = require('../models/user'),
    bCrypt = require('bcrypt-nodejs');

const passReq = {
    passReqToCallback: true
};

/**
 * Use to handle web logins
 * @module login
 */
module.exports = (passport) => {

    const strategyCallback = (req, username, password, done) => {
        User.findOne({'email': username}, (err, user) => {
                if (err) {
                    return done(err);
                }
                if (!user) {
                    return done(null, false, req.flash('message', 'User Not found.'));
                }
                if (!isValidPassword(user, password)) {
                    return done(null, false, req.flash('message', 'Invalid Password'));
                }
                return done(null, user);
            }
        );
    };

    const isValidPassword = (user, password) => {
        return bCrypt.compareSync(password, user.password);
    };

    passport.use('login', new LocalStrategy(passReq, strategyCallback));
};