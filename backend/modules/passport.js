'use strict';
let LocalStrategy = require('passport-local').Strategy,
    _ = require('./functions/passport-functions');

/**
 * Module to handle web user authentication(not api authentication!)
 * @module modules/passport
 */
module.exports = function (passport) {
    /** Serialize the user for the session */
    passport.serializeUser(_.serialize);

    /** Deserialize the user */
    passport.deserializeUser(_.deserialize);

    /** Local signup */
    passport.use('local-signup', new LocalStrategy(_.getLocalStrategyOptions, _.signUp));

    /** Local login */
    passport.use('local-login', new LocalStrategy(_.getLocalStrategyOptions, _.login));

};