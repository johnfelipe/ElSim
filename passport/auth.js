const config = require('../config');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const bCrypt = require('bcrypt-nodejs');
const console = require('better-console');

/** Class to handle passport auth methods. */
class Auth {
    /**
     *
     * @param req
     * @param res
     * @param next
     * @return {*}
     */
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

    /**
     *
     * @param req
     * @param res
     * @param next
     * @return {*}
     */
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

    /**
     *
     * @param req
     * @param res
     * @param next
     */
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

    /**
     *
     * @param user
     * @param password
     * @return {*}
     */
    static isValidPassword(user, password) {
        return bCrypt.compareSync(password, user.password);
    }

    /**
     *
     * @param req
     * @param res
     */
    static authenticate(req, res) {
        const handleUser = (user) => {
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
            res.status(200).json(object);
        };

        User.findOne({email: req.body.email})
            .then(handleUser)
            .catch((err) => res.status(400).json(err));
    }
}

module.exports = Auth;
