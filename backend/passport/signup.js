'use strict';
let LocalStrategy   = require('passport-local').Strategy,
    User = require('../models/user'),
    bCrypt = require('bcrypt-nodejs');

/**
 * Handle web signups
 * @module passport/signup
 */
module.exports = function(passport){

    passport.use('signup', new LocalStrategy({
            passReqToCallback : true
        },
        function(req, username, password, done) {
            let findOrCreateUser = function(){
                User.findOne({ 'email' :  username }, function(err, user) {
                    if (err){
                        console.log('Error in SignUp: '+err);
                        return done(err);
                    }
                    if (user) {
                        console.log('User already exists with username: '+username);
                        return done(null, false, req.flash('message','User Already Exists'));
                    } else {
                        let newUser = new User();
                        newUser.email = username;
                        newUser.password = createHash(password);
                        newUser.name = req.param('name');
                        newUser.admin = false;
                        newUser.save(function(err) {
                            if (err){
                                console.log('Error in Saving user: '+err);
                                throw err;
                            }
                            console.log('User Registration succesful');
                            return done(null, newUser);
                        });
                    }
                });
            };
            process.nextTick(findOrCreateUser);
        })
    );
    let createHash = function(password){
        return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
    }
};