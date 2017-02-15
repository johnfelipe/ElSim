/* jshint esversion: 6 */
const nodemailer = require('nodemailer'),
    config = require('../credentials');
const transportConfig = {
    service: 'Gmail',
    auth: {
        user: config.user,
        pass: config.password
    }
};

(function(){
    function sendMail(destination,text,done){
        let transporter = nodemailer.createTransport(transportConfig);
        let mailOptions = {
            from: '"EllSim News" ' + config.user,
            to: destination,
            subject: 'EllSim newsletter',
            text: text,
            html: '<h2>EllSim NewsLetter</h2>' +
            'Thanks for be a member of our comunity.<hr>' +
            '<b>I want to tell you something:</b><br>' +
            '<i>'+ text +'</i>'
        };
        transporter.sendMail(mailOptions, done);
    }
    module.exports = {
        sendMail: sendMail
    };
})();

