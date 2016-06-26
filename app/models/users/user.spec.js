/**
 * Created by vadimsky on 20/06/16.
 */
const mongoose = require('../../../lib/mongoose');
var User  = require('./user');
var _ = require("lodash");
const async = require('async');
const jwt = require('jsonwebtoken');

// 1. drop tests database
// 2. append user
// 3. close connection;


mongoose.connection.on('open', function () {
    var db = mongoose.connection.db;
    db.dropDatabase((err) => {
        if (err) {
            throw err;
        }
        console.log("database was dropped... ");





        mongoose.disconnect();
    })
});



// var user  = new User({
//     username: 'stepan',
//     email: "stepan@baraban.net",
//     password: "secret"
// });

// user.save((err, user, affected) => {
//     if (err) {
//         console.log("save failed", err);
//         //throw err;
//     }
//     console.log(user);
//
// });

User.find({}, function (err, users) {
    if(err) {
        /*error!!!*/
        console.log(err);
        return;
    }
    _.forEach(users, (user) => console.log(JSON.stringify(user)));
});



User.findOne({"username": "stepan"}, function (err, user) {
    if(err) {
        /*error!!!*/
        console.log(err);
        return;
    }
    if (!user) return;
    console.log(user);
    if (user.checkPassword("secret")) {
        console.log("Hurrra!!!", user.getUserProfile());
    }

});