

let LocalStrategy = require('passport-local').Strategy,
    User = require('../models/user'),
    bCrypt = require('bcrypt-nodejs');

const Mailer = require('../utilities/mailer');

class SingUp {
    constructor(passport) {
        this.passReq = {
            passReqToCallback: true
        };
        this.passport = passport;
        this.passport.use('signup', new LocalStrategy(this.passReq, this.strategyCallback));
    }

    strategyCallback(req, username, password, done) {

        const handleUser = (user) => {
            if (user) {
                return done(null, false, req.flash('message', 'User Already Exists'));
            } else {
                let newUser = new User();
                newUser.email = username;
                newUser.password = SingUp.createHash(password);
                newUser.name = req.body.name;
                newUser.admin = false;
                newUser.resultados = [];
                if(typeof req.body.born !== 'undefined'){
                    newUser.born = req.body.born;
                }
                if(typeof req.body.phone !== 'undefined'){
                    newUser.phone = req.body.phone;
                }

                const mailSent = (result) => done(null, newUser);

                const userSaved = () => {
                    let mailer = new Mailer(username,'Hi ' + req.body.name +', you are wellcome. Thank you very much, keep in touch!');
                    return mailer.sendMail();
                };

                newUser.save()
                    .then(userSaved)
                    .then(mailSent)
                    .catch(done);
            }
        };

        const handleNextTick = () => {

            User.findOne({email: username})
                .then(handleUser)
                .catch(done);
        };

        process.nextTick(handleNextTick);
    }

    static createHash(password) {
        return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
    }
}
module.exports = SingUp;