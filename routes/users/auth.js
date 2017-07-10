const express  = require('express');
const router   = express.Router();
const response = require('../../modules/response').response;

module.exports = (passport) => {

    router.get('/login', (req, res) => {
        console.info('GET '.yellow + '/login');
        response(req, res, 'pages/auth/login', 'Login Page', {message: req.flash('message')});
    });

    router.get('/signup', (req, res) => {
        console.info('GET '.yellow + '/signup');
        response(req, res, 'pages/auth/register', 'Register', {message: req.flash('message')});
    });

    router.get('/signout', (req, res) => {
        console.info('GET '.yellow + '/signout');
        req.logout();
        res.redirect('/');
    });

    router.post('/login', passport.authenticate('login', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash   : true
    }));

    router.post('/signup', passport.authenticate('signup', {
        successRedirect: '/',
        failureRedirect: '/signup',
        failureFlash   : true
    }));

    return router;
};

