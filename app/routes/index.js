/**
 * Created by vadimsky on 17/06/16.
 */
const routes = require('express').Router();
//const apiRoutes = require('express').Router();
const users = require('../models/users');

const jwt = require('jsonwebtoken');
const config  = require('../../config');


routes
    .get('/routes', (req, res) => {
        res.status(200).json({ message: 'Connected!' });
    });



routes.use("/api", function(req, res, next) {

    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    // decode token
    if (token) {

        // verifies secret and checks exp
        jwt.verify(token, config.get('secret'), function(err, decoded) {
            if (err) {
                return res.status(401).json({ success: false, message: 'Failed to authenticate token.' });
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                next();
            }
        });

    } else {

        // if there is no token
        // return an error
        return res.status(403).json({
            success: false,
            message: 'No token provided.'
        });

    }
});

routes.use(users);

module.exports = routes;
