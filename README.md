![https://travis-ci.org/jesusgn90/TFG.svg?branch=master](https://travis-ci.org/jesusgn90/TFG.svg?branch=master)

# EllSim 

This is an electoral simulator, it's based on Spanish system. You can generate charts, reports, make changes on many params, learn, download some resources, connect an external client to the api, play with the minigames, and few more things!

# Setup

Install modules:

    $ sudo npm i -g nodemon
    $ git clone https://github.com/jesusgn90/TFG && cd TFG
    $ npm i

Run setup:

    $ npm setup

Run the project:

    $ npm start

To clear database:

    $ npm reset

## Technologies

The backend uses:

    * NodeJS + Express
    * MongoDB

The frontend is not Angular, it's simple set of views that uses:

    * Bootstrap 4

## Run Project

Open a shell:

    $ npm start

The web is at `/` and the API is at `/api/v1/`.

## Test

The project uses Mocha for the unit tests, to run all of them:

    $ npm test


## Docs

Run following command: 

    $ npm run generate-doc    

Then open `/doc/index.html`.
        
 
# Auth   
   
You can use your user to login on the web or to make requests to the api. 

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

# Contribute? Error detected? 

Fork it and pull request for contribute. If error is detected, please open an issue please, that's the good way.

# Contact

* Twitter: [@jesusgon90](https://twitter.com/jesusgon90)
* Linkedin: [@jesusgonzaleznovez](https://www.linkedin.com/in/jesusgonzaleznovez)
