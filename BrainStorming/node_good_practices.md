# Good Practices for NodeJS #
## Lectura asíncrona de fichero ##

	fs.readFile('/path/to/file', function (err, data) {
	    // err will be an error object if an error occured
	    // data will be the file that was read
	    console.log(data);
	});

## Require en la parte superior del fichero ##

	var _ = require('underscore');

	function myFunction(someArray){
	    // use underscore without the need
	    // to require it again
	    _.sort(someArray, function(item){
	        // do something with item
	    });
	}
	module.exports.myFunction = myFunction;

## Guardar this para referencia ##

	function MyClass() {
	    var self = this;
	    this.myMethod = function() {
	        console.log(self);
	    };
	}

	var myClass = new MyClass();
	myClass.myMethod(); // self resolves as the instance of MyClass

	var someFunction = myClass.myMethod;
	someFunction(); // self also resolves as the instance of MyClass

## Modo estricto siempre ##

	use strict;

## Comprobar que un Callback puede ser llamado ##

	callback = (typeof callback === 'function') ? callback : function() {};

## Pasar el error como primer parámetro de las Callback ##

	function myFunction(someArray, callback){
	    // an example of an error that could occur
	    // if the passed in object is
	    // not the right data type
	    if( !Array.isArray(someArray) ){
	        var err = new TypeError('someArray must be an array');
	        callback(err, null);
	        return;
	    }
	    // ... do other stuff
	    callback(null, someData);
	}
	module.export.myFunction = myFunction;

## Comprobar siempre si hay error en un Callback ##

	myAsyncFunction({
	        some: 'data'
	    }, function(err, someReturnedData) {
	        if(err){
	            // don't use someReturnedData
	            // it's not populated
	            return;
	        }
	        // do something with someReturnedData
	        // we know there was no error
	    }
	});

## Usar module.exports en vez de exports ##

	module.exports = {};
	module.exports.someProperty = 'someValue';

*someProperty* se exportará como parte del módulo.
		
	var exportedObject = require('./mod');
	console.log(exportedObject); // { someProperty: 'someValue' }
