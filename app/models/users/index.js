/**
 * Created by vadimsky on 17/06/16.
 */
'use strict';
const userRoutes = require('express').Router();
const config  = require('../../../config');
const async = require('async');
const jwt = require('jsonwebtoken');
const log = require('../../../lib/logger')(module);
const bodyParser = require('body-parser');


userRoutes
    .post('/auth', (req, res) => {
        log.info('Authenticate user');
        var token = authenticate(req, res);
        res.json({
            success: true,
            message: 'Enjoy your token!',
            token: token
        });
    })
    .get('/api/user',  (req, res) => {
        log.info('user data');
        res.json(req.decoded);
    });

module.exports = userRoutes;


// Implementations
function authenticate (req, res) {
    //TODO validate req.body.username and req.body.password
    //if is invalid, return 401
    if (!(req.body.username === 'vasya' && req.body.password === 'pupkin')) {
        log.info("It's not a Vasya!!!",req.body.username );
        res.status(401).json({message: 'Wrong user or password'});
        return;
    }

    var profile = {
        first_name: 'Vasya',
        last_name: 'Pupkin',
        email: 'vasya@pupkin.com',
        id: 123
    };

    // We are sending the profile inside the token
    let secret = config.get('secret');

    return jwt.sign(profile, secret, {
            expiresIn: '1d',
            algorithm: 'HS256'
           });

}