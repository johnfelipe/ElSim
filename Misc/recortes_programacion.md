

<!-- toc -->

- [Good Practices for NodeJS](#good-practices-for-nodejs)
  * [Usar siempre npm init](#usar-siempre-npm-init)
  * [Lectura asíncrona de fichero](#lectura-asíncrona-de-fichero)
  * [Require en la parte superior del fichero](#require-en-la-parte-superior-del-fichero)
  * [Guardar this para referencia](#guardar-this-para-referencia)
  * [Modo estricto siempre](#modo-estricto-siempre)
  * [Comprobar que un Callback puede ser llamado](#comprobar-que-un-callback-puede-ser-llamado)
  * [Pasar el error como primer parámetro de las Callback](#pasar-el-error-como-primer-parámetro-de-las-callback)
  * [Comprobar siempre si hay error en un Callback](#comprobar-siempre-si-hay-error-en-un-callback)
  * [Usar module.exports en vez de exports](#usar-moduleexports-en-vez-de-exports)
  * [Usar JsDoc para documentar el código](#usar-jsdoc-para-documentar-el-código)
  * [Usar un gestor de procesos](#usar-un-gestor-de-procesos)
  * [Seguir el estándar CommonJS](#seguir-el-estándar-commonjs)
- [La programación extrema o eXtreme Programming](#la-programación-extrema-o-extreme-programming)
  * [Características fundamentales del método](#características-fundamentales-del-método)
- [Test unitarios](#test-unitarios)
  * [Mocha](#mocha)
- [Keyboard Shortcuts for WebStorm](#keyboard-shortcuts-for-webstorm)

<!-- tocstop -->

# Good Practices for NodeJS #
## Usar siempre npm init ##

	mkdir myProject
	cd myProject
	npm init

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

## Usar JsDoc para documentar el código ##

Para más información [http://usejsdoc.org](http://usejsdoc.org)

## Usar un gestor de procesos ##

Puede usarse [upstart](https://en.wikipedia.org/wiki/Upstart) o [forever](https://www.npmjs.org/package/forever)

## Seguir el estándar CommonJS ##

Para más información [http://wiki.commonjs.org/wiki/CommonJS](http://wiki.commonjs.org/wiki/CommonJS)

# La programación extrema o eXtreme Programming #

Por la naturaleza del proyecto, por tratarse del TFG y por usar NodeJS es una metodología idónea.

## Características fundamentales del método ##

__Desarrollo iterativo e incremental__: pequeñas mejoras, unas tras otras.

__Pruebas unitarias continuas__, frecuentemente repetidas y automatizadas, incluyendo pruebas de regresión. Se aconseja escribir el código de la prueba antes de la codificación.

__Programación en parejas__: se recomienda que las tareas de desarrollo se lleven a cabo por 
dos personas en un mismo puesto. La mayor calidad del código escrito de esta manera -el 
código es revisado y discutido mientras se escribe- es más importante que la posible pérdida 
de productividad inmediata.

*Frecuente integración del equipo de programación con el cliente o usuario. Se recomienda que 
un representante del cliente trabaje junto al equipo de desarrollo.*

__Corrección de todos los errores antes de añadir nueva funcionalidad__. Hacer entregas 
frecuentes.

__Refactorización del código__, es decir, reescribir ciertas partes del código para aumentar 
su legibilidad y mantenibilidad pero sin modificar su comportamiento. Las pruebas han de 
garantizar que en la refactorización no se ha introducido ningún fallo.

__Propiedad del código compartida__: en vez de dividir la responsabilidad en el desarrollo de 
cada módulo en grupos de trabajo distintos, este método promueve el que __todo el personal__ 
pueda corregir y extender __cualquier parte del proyecto__. Las frecuentes pruebas de 
regresión garantizan que los posibles errores serán detectados.

__Simplicidad en el código__: es la mejor manera de que las cosas funcionen. Cuando todo 
funcione se podrá añadir funcionalidad si es necesario. La programación extrema apuesta que 
es más sencillo hacer algo simple y tener un poco de trabajo extra para cambiarlo si se 
requiere, que realizar algo complicado y quizás nunca utilizarlo.

-------------

Información obtenida de [https://es.wikipedia.org/wiki/Programaci%C3%B3n_extrema](https://es.wikipedia.org/wiki/Programaci%C3%B3n_extrema)

# Test unitarios #

Como en cualquier proyecto, es necesaria una parte de test unitarios para facilitar
el desarrollo y depuración del mismo.

## Mocha ##

Test framework para JavaScript & NodeJS.

Instalación global(recomendada por comodidad):

	sudo npm install -g mocha
	mocha test

Editar package.json para usar *npm test*:

	"scripts": {
		"test": "mocha test"
	}

Hecho esto podremos ejecutar:

	npm test

Otra opción es usar un Makefile, pero es un tema heredado de C/C++ y no es nuestro caso, pero 
para los nostálgicos se deja aquí el código:

	test:
		@NODE_ENV=test ./node_modules/mocha/bin/mocha test
	.PHONY: test

Usar make:

	make test

-------------------

Para más información [http://unitjs.com/guide/mocha.html](http://unitjs.com/guide/mocha.html)

# Keyboard Shortcuts for WebStorm #

|       Action                                                  				  |     Shortcut                                  |
| ------------------------------------------------------------------------------- | --------------------------------------------- |
| Find action by name 															  | Ctrl+Shift+A   							      |
| Show the list of available intention actions. 								  | Alt+Enter 									  |
| Switch between views (Project,Structure, etc.). 				                  | Alt+F1 										  |
| Switch between the tool windows and files opened in the editor. 				  | Ctrl+Tab 									  |
| Show the Navigation bar. 														  | Alt+Home  									  |
| Insert a live template. 														  | Ctrl+J 										  |
| Surround with a live template. 												  | Ctrl+Alt+J 									  |
| Edit an item from the Project or another tree view. 							  | F4 											  |
| Comment or uncomment a line or fragment of code with the line or block comment. | Ctrl+Slash, Ctrl+Shift+Slash 				  |
| Find class or file by name. 													  | Ctrl+N, Ctrl+Shift+N 						  |
| Duplicate the current line or selection.  									  | Ctrl+D 										  |
| Incremental expression selection. 											  | Ctrl+W and Ctrl+Shift+W 					  |
| Find/replace text string in the current file. 								  | Ctrl+F, Ctrl+R 								  |
| Find/replace text in the project or in the specified directory 				  | Ctrl+Shift+F, Ctrl+Shift+R 					  |
| Search everywhere. 															  | Double-press Shift 							  |
| Quick view the usages of the selected symbol. 								  | Ctrl+Shift+F7 								  |
| Expand or collapse a code fragment in the editor. 							  | Ctrl+NumPad Plus, Ctrl+NumPad - 			  |
| Invoke code completion. 														  | Ctrl+Space 									  |
| Show the list of available refactorings (Refactor This). 						  | Ctrl+Shift+Alt+T 							  |