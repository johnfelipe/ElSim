/* jshint esversion: 6 */
const User = require('../models/user');

class UserService {
    constructor() {

    }

    static findOne(id) {
        return User.findOne({_id: id});
    }

    static find() {
        return User.find({});
    }

    static saveOne(user) {
        let u = new User(user);
        return u.save();
    }

    static removeOne(id) {
        return User.findByIdAndRemove({_id: id});
    }

    static updateOne(id, done) {
        return done(new Error('not yet implemented'), null);
    }

    static remove() {
        return User.find({}).remove();
    }

}
module.exports = UserService;