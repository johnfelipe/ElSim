'use strict';
var Log = require('./../../models/log');
var Resultado = require('./../../models/resultado');
var User = require('./../../models/user');
var DB = require('./dbmanager_module');
var _ = require('./utils_module');
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
     * @param done
     */
    static loadCsv(done){
        var a = ['1977','1979','1982','1986','1989','1993','1996'];

        var i, len = a.length, path1, path2;
        for(i = 0; i < len; ++i){
            path1 = './csv/' + a[i] + '.csv';
            path2 = './csv/' + a[i] + '_PARTIDOS.csv';
            _.readCsv(path1,path2,saveData);
        }
        function saveData(data){
            var j, lenData = data.length;
            for(j = 0; j < lenData; ++j){
                DB.saveResultado(data[j],function(){ });
            }
        }
        done();
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
        Resultado.find({}).remove(done);
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
