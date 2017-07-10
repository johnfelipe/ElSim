/** Main module of the server side */
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
let app = express();
const mongoose = require('mongoose');
const config = require('./config');
const passport = require('passport');
const flash = require('connect-flash');
const expressSession = require('express-session');
const InitPassport = require('./passport/init');
const errorHandler = require('./misc/errorHandler');
const Q = require('q');
const colors = require('colors');
const console = require('better-console');

/** Common configuration for the server side. */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon('public/favicon.png'));

mongoose.connect(config.database);
mongoose.Promise = Q.Promise;

app.set('superSecret', config.secret);

/** Configuring Passport */
// TODO - Why Do we need this key ?
app.use(expressSession({secret: config.secret, cookie: {maxAge: 60000}, resave: true, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());
let initPassport = new InitPassport(passport);

/** Flash messages */
app.use(flash());

const quiz = require('./routes/games/quiz');

const comparator = require('./routes/simulator/comparator');
const country = require('./routes/simulator/country');
const district = require('./routes/simulator/district');

const users = require('./routes/users/users');
const auth = require('./routes/users/auth')(passport);

const data = require('./routes/data');
const misc = require('./routes/misc');

const apiLogs = require('./routes/api/logs');
const apiMisc = require('./routes/api/misc');
const apiQuestions = require('./routes/api/questions');
const apiResults = require('./routes/api/results');
const apiUsers = require('./routes/api/users');

app.use('/', quiz);

app.use('/', comparator);
app.use('/', country);
app.use('/', district);

app.use('/', data);
app.use('/', misc);

app.use('/', auth);
app.use('/users', users);
app.use('/api/v1/logs', apiLogs);
app.use('/api/v1', apiMisc);
app.use('/api/v1/questions', apiQuestions);
app.use('/api/v1/results', apiResults);
app.use('/api/v1/users', apiUsers);

/** Catch 404 and forward to error handler */
app.use(errorHandler.catchNotFound);

/** Development error handler will print stacktrace */
(app.get('env') === 'development') ? app.use(errorHandler.developmentHandler) : app.use(errorHandler.productionHandler);

module.exports = app;
