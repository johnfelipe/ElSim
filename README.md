# ElSim Project

[![https://travis-ci.org/jesusgn90/ElSim.svg?branch=master](https://travis-ci.org/jesusgn90/TFG.svg?branch=master)](https://travis-ci.org/jesusgn90/ElSim.svg?branch=master)

Live demo: [https://elsimproject.com/](https://elsimproject.com/) or [http://elsimproject.com/](http://elsimproject.com/)

__Required Node.js >= 8.0.0__

__Status:__ 

- This project was a University project. 
- The project received a grade of 9.2 out of 10.
- This project is no longer maintained but issues and pull requests are welcome any way.  

# Description

This is an electoral simulator, it's based on Spanish system. You can generate charts, reports, make changes on many params, learn, download some resources, connect an external client to the api, play with the minigames, and few more things!

# Setup

    $ git clone https://github.com/jesusgn90/ElSim 
    $ cd ElSim
    $ npm i

Edit `credentials.js`:

    module.exports = {
        user: process.env.MAIL || 'ellsim.project@gmail.com',
        adminUser: 'jesusgonzaleznovez@gmail.com',
        adminName: 'Jesús Ángel González Novez',
        password: process.env.MAIL_PASSWORD || 'abcdefg'
    };

Ok, in the above example we have 4 fields:

- `user`:      this field must to be a valid Gmail account that you own.
- `adminUser`: this field will be the admin user.
- `adminName`: this field will be the admin name.
- `password`:  this field will be the `user` Gmail account password and the `adminUser` web account password.

Run setup:

    $ npm run setup

Run the project:

    $ npm start

To clear database:

    $ npm run reset

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
    
# TO-DO

- Finish the API 100%.
- Implement all unit tests remaining.

# Contribute? Error detected? 

Fork it and pull request for contribute. If error is detected, please open an issue please, that's the good way.

# Contact

* Twitter: [@jesusgon90](https://twitter.com/jesusgon90)
* Linkedin: [@jesusgonzaleznovez](https://www.linkedin.com/in/jesusgonzaleznovez)
