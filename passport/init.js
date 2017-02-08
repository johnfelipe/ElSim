/* jshint esversion: 6 */
'use strict';
const login = require('./login'),
    signup = require('./signup'),
    User = require('../models/user');

/**
 * Serialize/Deserialize functions
 * @module passport/init
 */
module.exports = function(passport){

    passport.serializeUser(serializeUser);


    passport.deserializeUser(deserializeUser);

    /** Serialize an user */
    function serializeUser(user, done) {
        done(null, user._id);
    }

    /** Deserialize an user */
    function deserializeUser(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    }

    login(passport);
    signup(passport);
};