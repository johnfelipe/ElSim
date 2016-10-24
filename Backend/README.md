# How to use

Install nodemon:

    $ sudo npm i -g nodemon
    
Install dependencies:

    $ npm i
    
Run project:

    $ npm start
    Go http://localhost:3000/
            or
    Make GET,POST requests to the API.

Run tests:

    $ npm test
    
Nodeenv:

    $ nodeenv env
    $ . env/bin/activate
    (env)$ npm test
    (env)$ npm start   

Environment:

    $ node -v
        v.6.9.1
    $ npm -v
        3.10.8

# Parsing CSV

You can use the csv examples or create new examples to load to the system.

The csv file must be well formated for each year there are two files:

The first file must be named:

    YYYY.csv
    
The second file must be named:

    YYYY_PARTIDOS.csv
    
The first file and the second file must have same number of rows.

First file headers and an example row:

    comunidad,cod_provincia,provincia,poblacion,num_mesas,total_censo_electoral,total_votantes,votos_validos,votos_candidaturas,votos_blanco,votos_nulos,fecha
    Andalucía ,4,Almería ,388437,392,239935,186342,185182,184822,360,1160,197706

    
Second file headers and an example row:

    UCD,PSOE,PCE,AP,PSP-US,PDPC,PNV,FDC-EDC,UDC-IDCC,EC-FED,FDI,ASDCI,AET,AN18,RSE,EE,FJONSA,FUT,CAIC,ESB,PSPV,INDEP,PSG,DCV,FJONS,UNAI,BNPG,AFN,URA,PSOE-H,LLIGA,ANEPA-CP,UAN,PCU,DIV,CUPS,UAB,CCIA,URAS,FNI,PPCAN,DSCC,MS,MFA,ASA,CJA,INDEP,ANV,INDEP,INDEP,DCAR,INDEP,FN,CUP,PSCAN,PIM,FAA,PPROV,INDEP,ICU,PSDE,PDG,UDIB,INDEP,FL,INDEP,INDEP,INDEP,PRSV,INDEP,INDEP,AEICYU,CUIR,CIPYE,ADEC,ADC,FEI,PAE,PLI,INDEP,BAI,CAI
    92019,50723,11926,14886,5789,0,0,5553,0,0,770,892,0,775,771,0,718,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0


    


