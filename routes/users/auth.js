
const express = require('express'),
    router = express.Router(),
    response = require('../../modules/response').response;

module.exports = (passport) => {

    router.get('/login', (req, res) => {
        console.info('GET '.green + '/login');

        response(req, res, 'pages/auth/login', 'Login Page', {message: req.flash('message')});
    });

    router.get('/signup', (req, res) => {
        console.info('GET '.green + '/signup');

        response(req, res, 'pages/auth/register', 'Register', {message: req.flash('message')});
    });

    router.get('/signout', (req, res) => {
        console.info('GET '.green + '/signout');

        req.logout();
        res.redirect('/');
    });

    router.post('/login', passport.authenticate('login', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    }));

    router.post('/signup', passport.authenticate('signup', {
        successRedirect: '/',
        failureRedirect: '/signup',
        failureFlash: true
    }));

    return router;
};

