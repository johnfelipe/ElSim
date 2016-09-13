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