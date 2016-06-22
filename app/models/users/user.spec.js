/**
 * Created by vadimsky on 20/06/16.
 */
var User  = require('./user');
var _ = require("lodash");
//import  User from "./user";

var user  = new User({
    username: 'vasya112a44',
    email: "vasya@pup.coma1155",
    password: "a155234a56"
});

User.find({}, function (err, users) {
    if(err) {
        /*error!!!*/
        console.log(err);
        return;
    }
    _.forEach(users, (user) => console.log(JSON.stringify(user)));
});

// user.save((err, user, affected) => {
//     if (err) {
//        throw err;
//     }
//     console.log(user);
//
// });

User.findOne({"username": "vasya"}, function (err, user) {
    if(err) {
        /*error!!!*/
        console.log(err);
        return;
    }
    console.log(user);
    if (user.checkPassword("123456")) {
        console.log("Hurrra!!!");
    }

});