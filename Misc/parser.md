# Origen de los datos #

A pesar de ser un simulador se cuenta con una serie de datos desde 1977 sobre los
resultados electorales relativos al congreso. La web oficial del ministerio pone a disposición
un ficheros Excel en la siguiente dirección [http://www.infoelectoral.interior.es/min/areaDescarga.html?method=inicio](http://www.infoelectoral.interior.es/min/areaDescarga.html?method=inicio). Todos están estandarizados por lo que la 
forma de agrupar los datos en buena.

## Parseando los ficheros Excel del ministerio ##

Cada fichero se ha separado en 2 ficheros, uno relativo al total de votos (primeras columnas) y otro fichero
para los resultados por partidos. Se han cambiado los nombres de las cabeceras de cada columna.

Los ficheros quedan divididos en:

	AAAA.csv
	AAAA_PARTIDOS.csv

La cabecera de los de tipo AAAA.csv queda como sigue:

	comunidad,cod_provincia,provincia,poblacion,num_mesas,total_censo_electoral,total_votantes,votos_validos,votos_candidaturas,votos_blanco,votos_nulos,anio

La cabecera de los tipo AAAA_PARTIDOS.csv es así:

	PSOE,AP-PDP-PL,CDS,CIU,IU,EAJ-PNV,HB,MUC,PRD,EE,PA,ERC,CG,PST,PAR,AIC,UV,PCC,PSG-EG,FE-JONS,UCE,UPV,AC-INC,LV,AV,VERDE,UPR,BNG,POSI,EU,PSPA,PSM-EN,CUN,PORE,PSDC,ADEI,CL,PREPAL,ENV-URV,LOC,PMCN,CN,PRM,PED,PANCAL,CA,PROV,AE-AIC,PAEC,EMK,LKI

## Modelo de la base de datos ##

Teniendo en cuenta lo anterior, tendremos estructuras en nuestra base de datos de la siguiente forma:

	module.exports = mongoose.model(
	    'Resultado',
	    new Schema({
	        comunidad: String,
	        cod_provincia: Number,
	        provincia: String,
	        poblacion: Number,
	        num_mesas: Number,
	        total_censo_electoral: Number,
	        total_votantes: Number,
	        votos_validos: Number,
	        votos_candidaturas: Number,
	        votos_blanco: Number,
	        votos_nulos: Number,
	        anio: Number,
	        partidos: Object // votos, diputados
	    })
	);

Por tanto la combinación de varios objetos tipo Resultado nos podrá dar el resultado final de un año concreto.

## Código que lee el csv  ##

Con la siguiente función podemos generar la estructura anteriormente comentada pero sin guardarla.

	/**
	 *
	 * @param path1{String} Ruta del fichero csv con la provincia, votos, etc ...
	 * @param path2{String} Ruta del fichero csv con los partidos agrupados
	 * @param done{Function} Función callback
	 */
	static readCsv(path1,path2,done){
	    var csv = require('fast-csv');
	    var stream = fs.createReadStream(path1);
	    var resultados = [];
	    csv.fromStream(stream,{
	        headers : true
	    }).on('data', function(data){
	        resultados.push(data);
	    }).on('end', function(){
	        readParties();
	    });
	    function readParties(){
	        var i = 0;
	        stream = fs.createReadStream(path2);
	        csv.fromStream(stream,{
	            headers: true
	        }).on('data', function(partidos){
	            resultados[i].partidos = partidos;
	            i++;
	        }).on('end', function(){
	            done(resultados);
	        });
	    }
	}

El callback done(resultados) será el encargado de almacenarlo en la base de datos, siempre que no exista
previamente claro está.