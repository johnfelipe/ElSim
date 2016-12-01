'use strict';
const User = require('./../../models/user');

/**
 * Functions used by passport module
 * @see modules/passport
 * @module modules/functions/passport-functions
 */
module.exports = {
    /** Serialize the user */
    serialize: function (user, done) {
        done(null, user.id);
    },

    /** Deserialize the user */
    deserialize: function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    },

    /** Returns the options for a local passport strategy */
    getLocalStrategyOptions: function(){
        return {
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        };
    },

    /** Sign up function */
    signUp: function (req, email, password, done) {
        User.findOne({'local.email': email}, function (err, user) {
            if (err) {
                return done(err);
            }
            if (user) {
                return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
            } else {
                let newUser = new User();
                newUser.local.email = email;
                newUser.local.password = newUser.generateHash(password); // use the generateHash function in our user model
                newUser.save(function (err) {
                    if (err) {
                        throw err;
                    }
                    return done(null, newUser);
                });
            }
        });
    },

    /** Login function */
    login: function (req, email, password, done) {
        User.findOne({'local.email': email}, function (err, user) {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false, req.flash('loginMessage', 'No user found.'));
            }
            if (!user.validPassword(password)) {
                return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
            }
            return done(null, user);
        });

    }
};