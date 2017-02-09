/* jshint esversion: 6 */
const User = require('../../models/user'),
    Subscriber = require('../../models/subscriber'),
    Log = require('../../models/log'),
    Result = require('../../models/result'),
    Mailer = require('../../modules/mailer');

(function () {
    function profile(req, res) {
        let options = {
            title: 'Profile',
            user: req.user,
            advice: false
        };
        res.render('pages/auth/profile', options);
    }

    function loadAll(done){
        let promises = [], users, logs, results;

        promises.push(User.find({}, userCallback));
        promises.push(Log.find({}, logCallback));
        promises.push(Result.find({}, resultCallback));

        function userCallback(err, data) {
            if(err) throw err;
            users = [...data];
        }

        function logCallback(err, data) {
            if(err) throw err;
            logs = [...data];
        }

        function resultCallback(err, data) {
            if (err) throw err;
            results = [...data];
        }


        Promise.all(promises).then(function(){
            done(logs,results,users);
        });
    }

    function addSubscriber(req,res){
        let user = req.user,
            email = req.body.subscriber;

        let s = new Subscriber({
            email: email,
            options: {}
        });

        s.save(function(err){
            let options = {
                title: 'Help',
                user: user,
                err: err
            };
            res.render('pages/misc/help',options);
        });
    }

    function sendNews(req,res){
        Subscriber.find({},findDone);
        function findDone(err,subscribers){
            if(err) throw err;
            let mails = [];
            for(let s of subscribers){
                mails.push(s.email);
            }
            Mailer.sendMail(mails,'TEST',mailSent);
        }
        function mailSent(err,result){
            if(err) console.error(err);
            loadAll(doneLoad);
        }
        function doneLoad(logs,results,users){
            let options = {
                user: req.user,
                title: 'Administration',
                logs: logs,
                results: results,
                users: users
            };
            res.render('pages/auth/admin', options);
        }
    }

    module.exports = {
        profile: profile,
        addSubscriber: addSubscriber,
        sendNews: sendNews,
        loadAll: loadAll
    };

})();