/* jshint esversion: 6 */
'use strict';
const login = require('./login'),
    signup = require('./signup'),
    User = require('../models/user');

/** Serialize/Deserialize functions */
module.exports = function(passport){
    /** Serialize an user */
    const serializeUser = (user, done) => {
        done(null, user._id);
    };

    /** Deserialize an user */
    const deserializeUser = (id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    };

    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    login(passport);
    signup(passport);
};