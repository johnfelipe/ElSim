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
            err: false,
            moment: Moment
        };
        res.render('pages/auth/profile', options);
    });

    router.get('/profile/remove-result/:index', Auth.isProfileAuthenticated, (req, res) => {
        let options = {
            title: 'Profile',
            user: req.user,
            advice: false,
            err: false,
            moment: Moment
        };
        let index = parseInt(req.params.index);

        if (typeof req.user.resultados !== 'undefined') {
            if (typeof req.user.resultados[index] !== 'undefined') {
                let aux = [];
                for (let i = 0, len = req.user.resultados.length; i < len; i++) {
                    if (i !== index) {
                        aux.push(req.user.resultados[i]);
                    }
                }
                req.user.resultados = [...aux];
                req.user.save()
                    .then(() => res.render('pages/auth/profile', options))
                    .catch((err) => sendError(req, res, err));
            } else {
                res.render('pages/auth/profile', options);
            }
        } else {
            res.render('pages/auth/profile', options);
        }
    });

    router.post('/addSubscriber', (req, res) => {

        console.info('POST '.yellow + '/addSubscriber');

        if (typeof req.body.subscriber === 'undefined') {
            sendError(req, res, 'Parameters error');
            return;
        }

        let email = req.body.subscriber;

        let s = new Subscribers({
            email: email,
            options: {}
        });


        const mailSent = (result) => {
            res.render('pages/misc/help', {
                title: 'Help',
                user: req.user,
                err: null
            });
        };

        const sendMail = () => {
            let mailer = new Mailer(email, 'Thanks to subscribe to EllSim NewsLetter!');
            return mailer.sendMail();
        };

        s.save()
            .then(sendMail)
            .then(mailSent)
            .catch((err) => {

                if (typeof err.code !== 'undefined') {
                    if (err.code === 11000) {
                        res.render('pages/misc/help', {
                            title: 'Help',
                            user: req.user,
                            err: null,
                            already: true
                        });
                        return;
                    }

                }
                sendError(req, res, err);
            });
    });

    router.post('/sendNews', (req, res) => {
        console.info('POST '.yellow + '/sendNews');

        if (typeof req.body.notice === 'undefined') {
            sendError(req, res, 'Parameters error');
            return;
        }

        let subscribers = [];

        const errorHandler = (err) => sendError(req, res, err);

        const finalResponse = (resultado) => {
            res.render('pages/auth/admin', {
                user: req.user,
                title: 'Administration',
                Logs: resultado.logs,
                Results: resultado.results.length,
                Users: resultado.users,
                mailResult: 'Mail sent to ' + subscribers.length + ' users.',
                moment: Moment
            });
        };

        const mailSent = (result) => {
            console.log(result);
            return loadAll();
        };

        const handleSubscribers = (s) => {
            subscribers = s;
            let mails = [];

            for (let s of subscribers) {
                mails.push(s.email);
            }

            let mailer = new Mailer(mails, req.body.notice);
            return mailer.sendMail();
        };

        Subscribers.find()
            .then(handleSubscribers)
            .then(mailSent)
            .then(finalResponse)
            .catch(errorHandler);
    });

    /** Rutas de la interfaz web relativas a usuarios */
    module.exports = router;
}