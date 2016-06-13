/**
 * Created by vadimsky on 10/06/16.
 */
const express = require('express');
const config  = require('config');
const http  = require('http');
const path = require('path');
const csrf = require('csurf');
const log = require('lib/logger')(module);
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');


// create express app
const app = express();
app.set('port', config.get('port'));
app.use( favicon( path.join(__dirname, config.get('favicon'))));

// parse application/json
app.use(bodyParser.json());


// const passport = require('passport');
// const morgan      = require('morgan');
//
// const Strategy = require('passport-local');
//
// let jwt         = require('jwt-simple');
const cookieParser = require('cookie-parser')(config.get('secret'));
app.use(cookieParser);

//
var csrfProtection = csrf({ cookie: true });
app.use(csrfProtection);
var parseForm = bodyParser.urlencoded({ extended: false });
//
app.get('/', csrfProtection, function(req, res) {
    // pass the csrfToken to the view
    res.json({ csrfToken: req.csrfToken(), message: 'hello!'});
});


app.get('/test', csrfProtection, function(req, res) {
    // pass the csrfToken to the view
    res.json({ csrfToken: req.csrfToken(), message: 'Test!'});
});

//
// app.get('/form', csrfProtection, function(req, res) {
//     // pass the csrfToken to the view
//     res.render('send', { csrfToken: req.csrfToken() });
// });
//
// app.post('/process', parseForm, csrfProtection, function(req, res) {
//     res.send('data is being processed');
// });

app.listen(config.get('port'), function(){
    log.info('Express server listening on port:', config.get('port'));
});