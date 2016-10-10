'use strict';
var Log = require('./../../models/log');
var Resultado = require('./../../models/resultado');
var User = require('./../../models/user');

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
               throw err;
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
     * @param user
     * @param done
     */
    static saveUser(user, done){
        var u = new User(user);
        u.save(function(err){
            if(err) {
                throw err;
            }
            done();
        });
    }

    /**
     * 
     * @param anio
     * @param done
     */
    static getResultadoByAnio(anio,done){
        Resultado.find({anio:anio},function(err,data){
            if(err) throw err;
            done(data);
        });
    }

    /**
     *
     * @param resultado
     * @param done
     */
    static saveResultado(resultado, done){
        var r = new Resultado(resultado);
        r.save(function(err){
            if(err) {
                throw err;
            }
            done();
        });
    }

    /**
     *
     * @param done
     */
    static cleanResultado(done){
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
