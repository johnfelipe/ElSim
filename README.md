*Table of contents*
* [EllSim](#ellsim)
  * [Setup](#setup)
  * [Technologies](#technologies)
  * [Usage](#usage)
    * [Docs](#docs)
    * [Login](#login)
  * [Contribute? Error detected?](#contribute-error-detected)
  * [To-Do](#to-do)
  
# EllSim
This is an ellectoral simulator, is based on Spanish system. You can
 generate charts, reports, make changes on many params, learn, download some resources,
 connect an external client to the api, play with the minigames, and few more things!

## Setup
    $ sudo npm i -g nodemon
    $ git clone https://github.com/jesusgn90/TFG && cd TFG
    $ npm i
    $ npm start

Only if you want to test it on a virtual environment:

    $ nodeenv env
    $ . env/bin/activate
    (env)$ npm start   

## Technologies
- NodeJS
- MongoDB
- Bootstrap 4

## Usage
Open your browser or use an external api client.

    Web routes:  /
    Api routes:  /api/

Run tests:

    $ npm test



### Docs
If you are running the server go to:
    
    /doc/index.html
        
Also you can read them under directory:

    ./public/doc/*
   
### Login   
   
You can use your user to login on the web or to
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

## Contribute? Error detected? 
Fork it and pull request for contribute. If error is detected, please open an issue please, that's the good way.

# To-Do

* Country chart
    * Auto calculate mandates by population
    * Set parameters of calculation
    * Check Ceuta & Melilla
    * Agreggations
        * District, Comunity, Country
* Single chart
    * Show table of process