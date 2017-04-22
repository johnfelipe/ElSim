/* jshint esversion: 6 */
const User = require('../models/user');
{

    const findOne = (id) => {
        return User.findOne({_id: id});
    };

    const find = (done) => {
        User.find({},
            (err, data) => done(err, data)
        );
    };

    const saveOne = (user, done) => {
        let u = new User(user);
        u.save((err) => done(err, user));
    };

    const removeOne = (id, done) => {
        User.findByIdAndRemove({_id: id},
            (err, data) => done(err, data)
        );
    };

    const updateOne = (id, done) => {
        done(new Error('not yet implemented'), null);
    };

    const remove = (done) => {
        User.find({}).remove(() => done());
    };

    module.exports = {
        findOne,
        find,
        saveOne,
        removeOne,
        updateOne,
        remove
    };

}