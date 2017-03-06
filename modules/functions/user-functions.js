/* jshint esversion: 6 */
const User = require('../../models/user'),
    Subscriber = require('../../models/subscriber'),
    Log = require('../../models/log'),
    Result = require('../../models/result'),
    Mailer = require('../../modules/mailer');

(function () {
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

        promises.push(User.find({}, userCallback));
        promises.push(Log.find({}, logCallback));
        promises.push(Result.find({}, resultCallback));

        Promise.all(promises).then(() => done(logs, results, users));
    };

    const addSubscriber = (req, res) => {
        let user = req.user,
            email = req.body.subscriber;

        let s = new Subscriber({
            email: email,
            options: {}
        });

        s.save((err) => res.render('pages/misc/help', {
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
            checkError(err);
            loadAll(doneLoad);
        };

        const findDone = (err, subscribers) => {
            checkError(err);
            let mails = [];
            for (let s of subscribers) {
                mails.push(s.email);
            }
            Mailer.sendMail(mails, 'TEST', mailSent);
        };

        Subscriber.find({}, findDone);
    };

    module.exports = {
        profile: profile,
        addSubscriber: addSubscriber,
        sendNews: sendNews,
        loadAll: loadAll
    };

})();