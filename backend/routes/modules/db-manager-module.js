'use strict';
const Log = require('./../../models/log'),
    Resultado = require('./../../models/resultado'),
    User = require('./../../models/user'),
    _ = require('./util-module');

/**
 * Módulo para MongoDB con métodos auxiliares.
 * @returns {DbManager}
 * @constructor
 */
class DbManager{
    constructor(){

    }

    /**
     * Función que carga los ficheros csv con resultados históricos.
     * Parsea y guarda en la base de datos.
     * @param done{Function} callback
     */
    static loadCsv(done){
        var a = ['1977','1979','1982','1986','1989','1993','1996'];

        var i, len = a.length, path1, path2;
        for(i = 0; i < len; ++i){
            path1 = './csv/' + a[i] + '.csv';
            path2 = './csv/' + a[i] + '_PARTIDOS.csv';
            _.readCsv(path1,path2, csvCallback);
        }

        function csvCallback(data){
            var j, lenData = data.length;
            for(j = 0; j < lenData; ++j){
                DbManager.saveResultado(data[j],saveResultadoCallback);
            }
        }

        function saveResultadoCallback(){
            _.prettyPrint('Resultado guardado.');
        }
        done();
    }
    /**
     * Función para guardar logs en la base de datos.
     * @param message{String} mensaje que queremos guardar de log.
     * @param done{Function} callback
     */
    static saveLog(message,done){
        var l = new Log({
            message: message,
            date: new Date()
        });
        l.save(function(err){
            if(err) _.prettyPrint(err);
            done();
        });
    }

    /**
     * Función para vaciar los logs.
     * @param done{Function} callback
     */
    static cleanLog(done){
        Log.find({}).remove(done);
    }

    /**
     * Función para vaciar los usuarios. BE CAREFUL
     * @param done{Function} callback
     */
    static cleanUser(done){
        User.find({}).remove(done);
    }

    /**
     * Función para guardar un usuario.
     * @param user{Object} datos del usuario.
     * @param done{Function} callback
     */
    static saveUser(user, done){
        var u = new User(user);
        u.save(function(err){
            if(err) _.prettyPrint(err);
            done();
        });
    }

    /**
     * Función para buscar resultados por anio.
     * @param anio{Number} anio de búsqueda
     * @param done{Function} callback
     */
    static getResultadoByAnio(anio,done){
        Resultado.find({anio:anio},function(err,data){
            if(err) _.prettyPrint(err);
            done(data);
        });
    }
    /**
     * Función para buscar resultados por código de provincia.
     * @param cod{Number} código de provincia de búsqueda
     * @param done{Function} callback
     */
    static getResultadoByProvincia(cod,done){
        Resultado.find({cod_provincia:cod},function(err,data){
            if(err) _.prettyPrint(err);
            done(data);
        });
    }

    /**
     * Función para buscar un resultado por ID
     * @param id{String} id de la base de datos.
     * @param done{Function} callback
     */
    static getResultadoById(id,done){
        Resultado.find({id:id},function(err,data){
            if(err) _.prettyPrint(err);
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
        r.eleccion = {
            fecha: resultado.fecha,
            autor: 'sistema'
        };
        r.save(function(err){
            if(err) _.prettyPrint(err);

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
