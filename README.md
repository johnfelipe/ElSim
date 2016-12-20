# How to use

Install nodemon:

    $ sudo npm i -g nodemon
    
Install dependencies:

    $ npm i
    
Run project:

    $ npm start

Web routes:

    /
    
Api routes:

    /api/


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

# Generate documentation

Only the first time:
    
    $ chmod a+x ./gen_doc.sh

Generate documentation:

    $ ./gen_doc.sh
    
How to read the documentation:

    If you are running the server go to:
        /doc/index.html
        
    else you can read under directory:
        ./public/doc/*
   
# Web auth and API auth   
   
Is the same. You can use your user to login on the web or to
make requests to the api. 

Web:

    Click login button
    
        OR
    
    Go /login

API:

    Post request with:
    {
        'email': youremail,
        'password': yourpassword
    }
   
# API 
## Token 

Of course you must to have a token to authenticate and use the API. The reason is
to limit the abuse of the API. You can use the API 2500 requests per day so you have no problem to use in the free
way.

## Free usage

If you are planning to use the API in an external app or service, then you should pay a little to grow up your limit up to
1000000 requests per day.


## API methods
    
GET api welcome route
    
    /api/
    
GET api setup routes

    /api/setup
    /api/loadCsv

GET api models routes

    /api/users/:id
    /api/users
    /api/logs/:id
    /api/logs
    /api/resultados/:id
    /api/resultados

POST api authenticate route

    /api/authenticate

POST api models routes

    /api/users
    /api/resultados

PUT api models routes

    /api/users/:id
    /api/resultados/:id

DELETE api models routes

    /api/users/:id
    /api/logs
    /api/resultados/:id
    /api/resultados
