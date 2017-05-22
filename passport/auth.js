
const config = require('../config'),
    jwt = require('jsonwebtoken'),
    User = require('../models/user'),
    bCrypt = require('bcrypt-nodejs'),
    console = require('better-console');

class Auth {

    constructor() {

    }

    static isAuthenticated(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        res.render('pages/index', {
            title: 'Welcome Page',
            user: req.user,
            err: 'Sorry, but you must to login to use the simulator or manage data.'
        });
    }

    static isProfileAuthenticated(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        res.render('pages/auth/profile', {
            title: 'Profile',
            user: req.user,
            err: 'Sorry, but you must to login to see your profile!'
        });
    }

    static isApiAuthenticated(req, res, next) {
        let token = req.body.token || req.params.token || req.headers['x-access-token'];
        if (token) {
            jwt.verify(token, config.secret, (err, decoded) => {
                if (err) {
                    console.error(err);
                    return res.json({success: false, message: 'Failed to authenticate token.'});
                } else {
                    req.decoded = decoded;
                    next();
                }
            });
        } else {
            console.warn('No token provided');
            return res.status(403).send({
                success: false,
                message: 'No token provided.'
            });
        }
    }

    static isValidPassword(user, password) {
        return bCrypt.compareSync(password, user.password);
    }

    static authenticate(req, res) {
        User.findOne({email: req.body.email})
            .then((user) => {
                let object = {
                    success: false,
                    message: 'Authentication failed',
                    token: null
                };
                if (user) {
                    if (Auth.isValidPassword(user, req.body.password)) {
                        let token = jwt.sign(user, config.secret, {
                            expiresIn: 3600 // expires in 1 hours
                        });
                        object.success = true;
                        object.message = 'Enjoy your token!';
                        object.token = token;
                    }
                }
                res.json(object);
            })
            .catch((err) => {
                console.error(err);
                throw err;
            });
    }
}

module.exports = Auth;
