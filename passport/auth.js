/* jshint esversion: 6 */
const config = require('../config'),
    jwt = require('jsonwebtoken'),
    User = require('../models/user'),
    bCrypt = require('bcrypt-nodejs');

(function () {

    const isAuthenticated = (req, res, next) => {
        if (req.isAuthenticated()) {
            return next();
        }
        res.render('pages/index', {
            title: 'Welcome Page',
            user: req.user,
            err: 'Sorry, but you must to login to use the simulator or manage data.'
        });
    };

    const isProfileAuthenticated = (req, res, next) => {
        if (req.isAuthenticated()) {
            return next();
        }
        res.render('pages/auth/profile', {
            title: 'Profile',
            user: req.user,
            err: 'Sorry, but you must to login to see your profile!'
        });
    };

    const isApiAuthenticated = (req, res, next) => {
        let token = req.body.token || req.param('token') || req.headers['x-access-token'];
        if (token) {
            jwt.verify(token, config.secret, (err, decoded) => {
                if (err) {
                    return res.json({success: false, message: 'Failed to authenticate token.'});
                } else {
                    req.decoded = decoded;
                    next();
                }
            });
        } else {
            return res.status(403).send({
                success: false,
                message: 'No token provided.'
            });
        }
    };

    const authenticate = (req, res) => {
        User.findOne({email: req.body.email}, done);
        function done(err, user) {
            let object = {
                success: false,
                message: 'Authentication failed',
                token: null
            };
            if (err) throw err;
            if (user) {
                if (isValidPassword(user, req.body.password)) {
                    let token = jwt.sign(user, config.secret, {
                        expiresIn: 3600 // expires in 1 hours
                    });
                    object.success = true;
                    object.message = 'Enjoy your token!';
                    object.token = token;
                }
            }
            res.json(object);
        }
    };

    const isValidPassword = (user, password) => {
        return bCrypt.compareSync(password, user.password);
    };


    module.exports = {
        isAuthenticated: isAuthenticated,
        isApiAuthenticated: isApiAuthenticated,
        authenticate: authenticate,
        isValidPassword: isValidPassword,
        isProfileAuthenticated: isProfileAuthenticated
    };
})();
