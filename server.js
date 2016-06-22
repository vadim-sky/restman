/**
 * Created by vadimsky on 10/06/16.
 */
const express = require('express');
const config  = require('./config');

const path = require('path');
const log = require('./lib/logger')(module);

const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const routes = require('./app/routes');


const expressJwt = require('express-jwt');
const jwt = require('jsonwebtoken');



// var passport = require('passport');
// var morgan      = require('morgan');
// var Strategy = require('passport-local');
// var jwt         = require('jwt-simple');


const app = express();
app.listen(config.get('port'), () => {
    log.info('Express server listening on port:', config.get('port'));
});


/**
 * Middleware
 */
app.use(favicon( path.join(__dirname, config.get('favicon'))));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
//app.use(bodyParser.json());

// parse various different custom JSON types as JSON
app.use(bodyParser.json({ type: 'application/*+json' }));

// We are going to protect /api routes with JWT
//app.use(expressJwt({secret: config.get('secret')}).unless({path: ['/auth']}));


/**
 * Routes
 */
app.use(routes);


app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401).send('invalid token...');
    }
});