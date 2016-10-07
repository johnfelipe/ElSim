'use strict';
var Log = require('./../../models/log');
/**
 * Módulo para MongoDB con métodos auxiliares.
 * @returns {DbManager}
 * @constructor
 */
class DbManager{
    constructor(){

    }

    /**
     *
     * @param message
     * @param done
     */
    static saveLog(message,done){
        var l = new Log({
            message: message,
            date: new Date()
        });
        l.save(function(err){
           if(err){
               console.log(err);
           }
           done();
        });
    }

    /**
     *
     * @param done
     */
    static cleanLog(done){
        Log.find({}).remove(done);
    }

    /**
     *
     * @param done
     */
    static cleanUser(done){
        User.find({}).remove(done);
    }

    /**
     *
     * @param email
     * @param done
     */
    static deleteUserByEmail(email,done){
        User.find({email: email}).remove(done);
    }

    /**
     *
     * @param name
     * @param done
     */
    static deleteUserByName(name,done){
        User.find({name: name}).remove(done);
    }

}
module.exports = DbManager;
