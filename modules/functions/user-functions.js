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
        res.render('pages/profile', options);
    }
    function loadAll(done){
        let promises = [], users, logs, results;
        promises.push(
            User.find({}, function (err, data) {
                users = data;
            })
        );
        promises.push(
            Log.find({}, function (err, data) {
                logs = data;
            })
        );
        promises.push(
            Result.find({}, function (err, data) {
                results = data;
            })
        );
        Promise.all(promises).then(function(){
            done(logs,results,users);
        });
    }
    function addSubscriber(req,res){
        let s = new Subscriber({
            email: req.body.subscriber,
            options: {}
        });

        s.save(function(err){
            if(err) throw err;
            let options = {
                title: 'Help',
                user: req.user,
                err: err
            };
            res.render('pages/help',options);
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
            if(err) throw err;
            console.log(result);
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
            res.render('pages/admin', options);
        }
    }
    module.exports = {
        profile: profile,
        addSubscriber: addSubscriber,
        sendNews: sendNews,
        loadAll: loadAll
    };
})();