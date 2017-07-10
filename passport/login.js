const LocalStrategy = require('passport-local').Strategy;
const User          = require('../models/user');
const bCrypt        = require('bcrypt-nodejs');

/** Class to manage login actions. */
class Login {
    /**
     *
     * @param passport
     */
    constructor(passport) {
        this.passReq  = {
            passReqToCallback: true
        };
        this.passport = passport;
        this.passport.use('login', new LocalStrategy(this.passReq, this.strategyCallback));
    }

    /**
     *
     * @param req
     * @param username
     * @param password
     * @param done
     */
    strategyCallback(req, username, password, done) {
        const handleUser = (user) => {
            if (!user) {
                done(null, false, req.flash('message', 'User Not found.'));
                return;
            }
            if (!Login.isValidPassword(user, password)) {
                done(null, false, req.flash('message', 'Invalid Password'));
                return;
            }
            done(null, user);
        };

        User.findOne({email: username})
            .then(handleUser)
            .catch(done);
    }

    static isValidPassword(user, password) {
        return bCrypt.compareSync(password, user.password);
    }
}
module.exports = Login;