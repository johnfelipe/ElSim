const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const bCrypt = require('bcrypt-nodejs');
const Mailer = require('../utilities/mailer');

/** Class to manage singup actions. */
class SingUp {
    /**
     *
     * @param passport
     */
    constructor(passport) {
        this.passReq = {
            passReqToCallback: true
        };
        this.passport = passport;
        this.passport.use('signup', new LocalStrategy(this.passReq, this.strategyCallback));
    }

    /**
     *
     * @param req
     * @param username
     * @param password
     * @param done
     */
    strategyCallback(req, username, password, done) {

        /**
         *
         * @param user
         * @return {*}
         */
        const handleUser = (user) => {
            if (user) {
                done(null, false, req.flash('message', 'User Already Exists'));
                return;
            }
            let newUser = new User();
            newUser.email = username;
            newUser.password = SingUp.createHash(password);
            newUser.name = req.body.name;
            newUser.admin = false;
            newUser.results = [];

            if (typeof req.body.born !== 'undefined') {
                newUser.born = req.body.born;
            }

            if (typeof req.body.phone !== 'undefined') {
                newUser.phone = req.body.phone;
            }

            /**
             *
             * @return {*}
             */
            const userSaved = () => {
                let mailer = new Mailer(username, 'Hi ' + req.body.name + ', you are wellcome. Thank you very much, keep in touch!');
                return mailer.sendMail();
            };

            newUser.save()
                .then(userSaved)
                .then((result) => done(null, newUser))
                .catch(done);
        };

        /**
         *
         */
        const handleNextTick = () => {

            User.findOne({email: username})
                .then(handleUser)
                .catch(done);
        };

        process.nextTick(handleNextTick);
    }

    /**
     *
     * @param password
     * @return {*}
     */
    static createHash(password) {
        return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
    }
}
module.exports = SingUp;