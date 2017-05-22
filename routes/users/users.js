const express = require('express'),
    router = express.Router(),
    Auth = require('../../passport/auth'),
    Subscribers = require('../../models/subscriber'),
    Mailer = require('../../utilities/mailer'),
    loadAll = require('../../services/all').loadAll,
    sendError = require('../error').sendError,
    Moment = require('moment');

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

        console.info('POST '.green + '/addSubscriber');

        let email = req.body.subscriber;

        let s = new Subscribers({
            email: email,
            options: {}
        });


        s.save()
            .then((data) => {
                console.info(data);
                res.render('pages/misc/help', {
                    title: 'Help',
                    user: req.user,
                    err: null
                });
            })
            .catch((err) => {
                sendError(req, res, err);
            });
    });

    router.post('/sendNews', (req, res) => {
        console.info('POST '.green + '/sendNews');

        const errorHandler = (err) => sendError(req, res, err);

        Subscribers.find()
            .then((subscribers) => {

                if (subscribers.length !== 0) {
                    let mails = [];
                    for (let s of subscribers) {
                        mails.push(s.email);
                    }

                    let mailer = new Mailer(mails, req.body.notice);

                    mailer.sendMail()
                        .then((result) => {
                            console.log('Mail sent result:', result);
                            loadAll()
                                .then((resultado) => {
                                    res.render('pages/auth/admin', {
                                        user: req.user,
                                        title: 'Administration',
                                        Logs: resultado.logs,
                                        Results: resultado.results.length,
                                        Users: resultado.users,
                                        mailResult: 'Mail sent to ' + subscribers.length + ' users.',
                                        moment:Moment
                                    });
                                }).catch(errorHandler);

                        }).catch(errorHandler);
                } else {
                    console.log('Mail sent to 0 users, because there are 0 subscribers.');
                    loadAll()
                        .then((resultado) => {
                            res.render('pages/auth/admin', {
                                user: req.user,
                                title: 'Administration',
                                Logs: resultado.logs,
                                Results: resultado.results.length,
                                Users: resultado.users,
                                mailResult: 'Mail sent to 0 users, because there are 0 subscribers.',
                                moment:Moment
                            });
                        }).catch(errorHandler);
                }

            }).catch(errorHandler);
    });

    /** Rutas de la interfaz web relativas a usuarios */
    module.exports = router;
}