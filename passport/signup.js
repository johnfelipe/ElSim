/* jshint esversion: 6 */
'use strict';
let LocalStrategy = require('passport-local').Strategy,
    User = require('../models/user'),
    bCrypt = require('bcrypt-nodejs');

const passReq = {
    passReqToCallback: true
};

/**
 * Handle web signups
 * @module signup
 */
module.exports = (passport) => {

    const strategyCallback = (req, username, password, done) => {
        let findOrCreateUser = () => {
            User.findOne({email: username}, (err, user) => {
                if (err) {
                    console.error(err);
                    return done(err);
                }

                if (user) {
                    return done(null, false, req.flash('message', 'User Already Exists'));
                } else {
                    let newUser = new User();
                    newUser.email = username;
                    newUser.password = createHash(password);
                    newUser.name = req.param('name');
                    newUser.admin = false;
                    newUser.apiUsage = {};
                    newUser.save((err) => {
                        if (err) {
                            console.error(err);
                            throw err;
                        }
                        return done(null, newUser);
                    });
                }
            });
        };
        process.nextTick(findOrCreateUser);
    };

    passport.use('signup', new LocalStrategy(passReq, strategyCallback));

    const createHash = (password) => {
        return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
    };
};