'use strict';
const login = require('./login'),
    signup = require('./signup'),
    User = require('./../models/user');

/**
 * Serialize/Deserialize functions
 * @module passport/init
 */
module.exports = function(passport){
    /** Serialize an user */
    passport.serializeUser(function(user, done) {
        console.log('serializing user: ');
        console.log(user);
        done(null, user._id);
    });

    /** Deserialize an user */
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            console.log('deserializing user:',user);
            done(err, user);
        });
    });

    login(passport);
    signup(passport);
};