![https://travis-ci.org/jesusgn90/TFG.svg?branch=master](https://travis-ci.org/jesusgn90/TFG.svg?branch=master)

__Required Node.js >= 8.0.0__

# EllSim 

This is an electoral simulator, it's based on Spanish system. You can generate charts, reports, make changes on many params, learn, download some resources, connect an external client to the api, play with the minigames, and few more things!

# Setup

Install modules:

    $ sudo npm i -g nodemon
    $ git clone https://github.com/jesusgn90/TFG && cd TFG
    $ npm i

Edit `credentials.js`:

    module.exports = {
        user: process.env.MAIL || 'ellsim.project@gmail.com',
        adminUser: 'jesusgonzaleznovez@gmail.com',
        adminName: 'Jesús Ángel González Novez',
        password: process.env.MAIL_PASSWORD || 'abcdefg'
    };

Ok, in the above example we have 4 fields:

- `user`: this field must to be a valid Gmail account that you own.
- `adminUser`: this field will be the admin user.
- `adminName`: this field will be the admin name.
- `password`: this field will be the `user` Gmail account password and the `adminUser` web account password.

Run setup:

    $ npm run setup

Run the project:

    $ npm start

To clear database:

    $ npm run reset

## Technologies

The backend uses:

    * Node.js + Express
    * MongoDB

The frontend is not Angular, it's a simple set of views that uses:

    * Bootstrap 4

## Run Project

Open a shell:

    $ npm start

The web is at `/` and the API is at `/api/v1/`.

## Test

The project uses `Istanbul & Mocha` for the unit tests, to run all of them:

    $ npm test


## Docs

Run following command: 

    $ npm run generate-doc    

Then open `/doc/index.html`.
        
 
# Auth   
   
You can use your user to login on the web or to make requests to the api. 

Web:

    Click login button

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
