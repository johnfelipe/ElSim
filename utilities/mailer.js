

const nodemailer = require('nodemailer');
const Q = require('q');
let config;

try {
    config = require('../credentials');
} catch (e) {
    console.log('credentials.js not found, using jesusgonzaleznovez@gmail.com as user');
    config = {user: 'foo@foo.com', password: 'foo'};
}

class Mailer{
    constructor(destination, text){
        this.destination = destination;
        this.text = text;
        this.transportConfig = {
            service: 'Gmail',
            auth: {
                user: config.user,
                pass: config.password
            }
        };
    }

    sendMail() {
        let promise = Q.defer();

        if(this.destination.length === 0){
            promise.reject('No destination to send mail');
            return promise.promise;
        }else {
            let transporter = nodemailer.createTransport(this.transportConfig);

            let mailOptions = {
                from: '"EllSim News" ' + config.user,
                to: this.destination,
                subject: 'EllSim newsletter',
                text: this.text,
                html: '<h2>EllSim NewsLetter</h2> Thanks for be a member of our community.<hr><b>I want to tell you something:</b><br><i>' + this.text + '</i>'
            };

            const done = (err,result) => {
                if(err){
                    promise.reject(err);
                }else {
                    promise.resolve(result);
                }
            };

            transporter.sendMail(mailOptions, done);
        }

        return promise.promise;
    }
}
module.exports = Mailer;

