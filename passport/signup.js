/* jshint esversion: 6 */
'use strict';
let LocalStrategy   = require('passport-local').Strategy,
    User = require('../models/user'),
    bCrypt = require('bcrypt-nodejs');

const passReq = {
    passReqToCallback : true
};

/**
 * Handle web signups
 * @module passport/signup
 */
module.exports = function(passport){

    passport.use('signup', new LocalStrategy(passReq,strategyCallback));

    function strategyCallback(req, username, password, done) {
        let findOrCreateUser = function(){
            User.findOne({ 'email' :  username }, function(err, user) {
                if (err){
                    return done(err);
                }

                if (user) {
                    return done(null, false, req.flash('message','User Already Exists'));
                } else {
                    let newUser = new User();
                    newUser.email = username;
                    newUser.password = createHash(password);
                    newUser.name = req.param('name');
                    newUser.admin = false;
                    newUser.apiUsage = {};
                    newUser.save(function(err) {
                        if (err) throw err;
                        return done(null, newUser);
                    });
                }
            });
        };
        process.nextTick(findOrCreateUser);
    }

    function createHash(password){
        return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
    }
};