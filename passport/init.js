const Login = require('./login');
const SingUp = require('./signup');
const User = require('../models/user');

/** Class to initialize auth system. */
class InitAuth {
    /**
     *
     * @param passport
     */
    constructor(passport) {
        this.passport = passport;
        this.passport.serializeUser(InitAuth.serializeUser);
        this.passport.deserializeUser(this.deserializeUser);
        this.login = new Login(passport);
        this.singnup = new SingUp(passport);
    }

    /**
     * Serialize an user.
     * @param user
     * @param done
     * @return {*}
     */
    static serializeUser(user, done) {
        return done(null, user._id);
    }

    /**
     * Deserialize an user.
     * @param id
     * @param done
     */
    deserializeUser(id, done) {
        User.findById(id)
            .then((user) => done(null, user))
            .catch(done);
    }
}
module.exports = InitAuth;