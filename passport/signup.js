

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
        process.nextTick(() => {
            User.findOne({email: username})
                .then((user) => {
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
                        newUser.save()
                            .then(() => {
                                let mailer = new Mailer(username,'Hi ' + req.body.name +', you are wellcome. Thank you very much, keep in touch!');
                                mailer.sendMail()
                                    .then((result) => {
                                        console.log(result);
                                        done(null, newUser);
                                    })
                                    .catch((err) => {
                                        console.error(err);
                                        done(null, newUser);
                                    });
                            })
                            .catch((err) => {
                                console.error(err);
                                done(err,null);
                            });
                    }
                })
                .catch((err) => done(err,null));
        });
    }

    static createHash(password) {
        return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
    }
}
module.exports = SingUp;