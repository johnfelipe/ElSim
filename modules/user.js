/* jshint esversion: 6 */
const Mailer = require('../utilities/mailer'),
    Users = require('../services/users'),
    Subscribers = require('../services/subscribers'),
    Logs = require('../services/logs'),
    Results = require('../services/results');

/**
 *
 * @module user-functions
 */
{
    const profile = (req, res) => {
        let options = {
            title: 'Profile',
            user: req.user,
            advice: false,
            err: false
        };
        res.render('pages/auth/profile', options);
    };

    const checkError = (err) => {
        if (err) {
            throw err;
        }
    };

    const loadAll = (done) => {
        let promises = [], users, logs, results;

        const userCallback = (err, data) => {
            checkError(err);
            users = [...data];
        };

        const logCallback = (err, data) => {
            checkError(err);
            logs = [...data];
        };

        const resultCallback = (err, data) => {
            checkError(err);
            results = [...data];
        };

        promises.push(Users.find(userCallback));
        promises.push(Logs.find(logCallback));
        promises.push(Results.find(resultCallback));

        Promise.all(promises).then(() => done(logs, results, users));
    };

    const addSubscriber = (req, res) => {
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

    };

    const sendNews = (req, res) => {
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
    };

    module.exports = {
        profile,
        addSubscriber,
        sendNews,
        loadAll
    };

}