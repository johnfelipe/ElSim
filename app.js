/** Main module of the server side */
let express = require('express');
let path = require('path');
let favicon = require('serve-favicon');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let app = express();
let mongoose = require('mongoose');
let config = require('./config');
let passport = require('passport');
let flash = require('connect-flash');
let expressSession = require('express-session');
let InitPassport = require('./passport/init');
let errorHandler = require('./misc/errorHandler');
let Q = require('q');
let colors = require('colors');
let console = require('better-console');

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

let quiz = require('./routes/games/quiz');

let comparator = require('./routes/simulator/comparator');
let country = require('./routes/simulator/country');
let district = require('./routes/simulator/district');

let users = require('./routes/users/users');
let auth = require('./routes/users/auth')(passport);

let data = require('./routes/data');
let misc = require('./routes/misc');

let apiLogs = require('./routes/api/logs');
let apiMisc = require('./routes/api/misc');
let apiQuestions = require('./routes/api/questions');
let apiResults = require('./routes/api/results');
let apiUsers = require('./routes/api/users');

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
