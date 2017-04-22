/* jshint esversion: 6 */
'use strict';
const express = require('express'),
    router = express.Router(),
    Auth = require('../../passport/auth'),
    Subscribers = require('../../models/subscriber'),
    Mailer = require('../../utilities/mailer'),
    loadAll = require('../../services/all').loadAll,
    sendError = require('../error').sendError;
{
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

        Subscribers.saveOne(s)
            .then((data) => {
                res.render('pages/misc/help', {
                    title: 'Help',
                    user: user,
                    err: null
                });
            })
            .catch((err) => {
                sendError(req, res, err);
            });
    });

    router.post('/sendNews', (req, res) => {
        const doneLoad = (logs, results, users) => {
            res.render('pages/auth/admin', {
                user: req.user,
                title: 'Administration',
                logs: logs,
                results: results,
                users: users
            });
        };

        const mailSent = (err, result) => {
            if (err) {
                sendError(req, res, err);
            } else {
                console.log('Mail sent result:', result);
                loadAll()
                    .then((resultado) => {
                        res.render('pages/auth/admin', {
                            user: req.user,
                            title: 'Administration',
                            logs: resultado.logs,
                            results: resultado.results,
                            users: resultado.users
                        });
                    })
                    .catch((err) => {
                        sendError(req, res, err);
                    });
            }

        };

        Subscribers.find()
            .then((subscribers) => {
                let mails = [];
                for (let s of subscribers) {
                    mails.push(s.email);
                }
                Mailer.sendMail(mails, 'TEST', mailSent);
            })
            .catch((err) => {
                sendError(req, res, err);
            });
    });

    /** Rutas de la interfaz web relativas a usuarios */
    module.exports = router;
}