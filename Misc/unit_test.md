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