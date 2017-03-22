/* jshint esversion: 6 */
'use strict';
const express = require('express'),
    router = express.Router(),
    Auth = require('../../passport/auth'),
    Subscribers = require('../../models/subscriber'),
    Mailer = require('../../utilities/mailer'),
    checkError = require('../../services/all').checkError,
    loadAll = require('../../services/all').loadAll;

router.get('/profile', Auth.isProfileAuthenticated, (req, res) => {
    let options = {
        title: 'Profile',
        user: req.user,
        advice: false,
        err: false
    };
    res.render('pages/auth/profile', options);
});

router.post('/addSubscriber', (req, res) => {
    let user = req.user,
        email = req.body.subscriber;

    let s = {
        email: email,
        options: {}
    };

    Subscribers.saveOne(s, (err, data) => res.render('pages/misc/help', {
            title: 'Help',
            user: user,
            err: err
        })
    );

});

router.post('/sendNews', (req, res) => {
    const doneLoad = (logs, results, users) => res.render('pages/auth/admin', {
        user: req.user,
        title: 'Administration',
        logs: logs,
        results: results,
        users: users
    });

    const mailSent = (err, result) => {
        console.log('Mail sent result:', result);
        checkError(err);
        loadAll(doneLoad);
    };

    Subscribers.find((err, subscribers) => {
        checkError(err);
        let mails = [];
        for (let s of subscribers) {
            mails.push(s.email);
        }
        Mailer.sendMail(mails, 'TEST', mailSent);
    });
});

/** Rutas de la interfaz web relativas a usuarios */
module.exports = router;
