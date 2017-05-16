/* jshint esversion: 6 */
const User = require('../models/user');
{

    const findOne = (id) => User.findOne({_id: id});

    const find = () => User.find({});

    const saveOne = (user) => {
        let u = new User(user);
        return u.save();
    };

    const removeOne = (id) => User.findByIdAndRemove({_id: id});

    const updateOne = (id, done) => done(new Error('not yet implemented'), null);

    const remove = () => User.find({}).remove();

    module.exports = {
        findOne,
        find,
        saveOne,
        removeOne,
        updateOne,
        remove
    };

}