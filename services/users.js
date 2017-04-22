/* jshint esversion: 6 */
const User = require('../models/user');
{

    const findOne = (id) => {
        return User.findOne({_id: id});
    };

    const find = () => {
        return User.find({});
    };

    const saveOne = (user) => {
        let u = new User(user);
        return u.save();
    };

    const removeOne = (id) => {
        return User.findByIdAndRemove({_id: id});
    };

    const updateOne = (id, done) => {
        done(new Error('not yet implemented'), null);
    };

    const remove = () => {
        return User.find({}).remove();
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