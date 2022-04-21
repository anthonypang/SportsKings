var express = require('express');
var path = require('path');
var session = require('express-session');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var connectionController = require('./controller/connectionController');
var mainController = require('./controller/mainController');
var userController = require('./controller/userController');

app.set('views', path.join(__dirname, 'view'))
app.set('view engine', 'ejs')

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.use(session({ secret: 'NBAD', saveUninitialized: true, resave: true }));

app.use('/', mainController)
app.use('/about', connectionController)
app.use('/contact', connectionController)
app.use('/connections', connectionController)
app.use('/savedConnections', userController)




app.listen(process.env.PORT || 3000);
console.log('localhost:3000')

module.exports = app;