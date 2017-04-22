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
        process.nextTick(() => {
            User.findOne({email: username})
                .then((user) => {
                    if (user) {
                        return done(null, false, req.flash('message', 'User Already Exists'));
                    } else {
                        let newUser = new User();
                        newUser.email = username;
                        newUser.password = createHash(password);
                        newUser.name = req.param('name');
                        newUser.admin = false;
                        newUser.apiUsage = {};
                        newUser.save()
                            .then(()=> {
                                return done(null, newUser);
                            })
                            .catch((err) => {
                                console.error(err);
                                throw err;
                            });
                    }
                })
                .catch((err) => {
                    console.error(err);
                    return done(err);
                });
        });
    };

    passport.use('signup', new LocalStrategy(passReq, strategyCallback));

    const createHash = (password) => {
        return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
    };
};