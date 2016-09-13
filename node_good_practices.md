# Good Practices for NodeJS #
## Lectura asíncrona de fichero ##
	
	fs.readFile('/path/to/file', function (err, data) {
	    // err will be an error object if an error occured
	    // data will be the file that was read
	    console.log(data);
	});