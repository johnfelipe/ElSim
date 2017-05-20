/* jshint esversion: 6 */
'use strict';
let LocalStrategy = require('passport-local').Strategy,
    User = require('../models/user'),
    bCrypt = require('bcrypt-nodejs');

class SingUp {
    constructor(passport) {
        this.passReq = {
            passReqToCallback: true
        };
        this.passport = passport;
        this.passport.use('signup', new LocalStrategy(this.passReq, this.strategyCallback));
    }

    strategyCallback(req, username, password, done) {
        process.nextTick(() => {
            User.findOne({email: username})
                .then((user) => {
                    if (user) {
                        return done(null, false, req.flash('message', 'User Already Exists'));
                    } else {
                        let newUser = new User();
                        newUser.email = username;
                        newUser.password = SingUp.createHash(password);
                        newUser.name = req.params.name;
                        newUser.admin = false;
                        newUser.apiUsage = {};
                        newUser.save()
                            .then(() => done(null, newUser))
                            .catch((err) => {
                                console.error(err);
                                throw err;
                            });
                    }
                })
                .catch((err) => done(err));
        });
    }


    static createHash(password) {
        return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
    }
}
module.exports = SingUp;