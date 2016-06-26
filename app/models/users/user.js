/**
 * Created by vadimsky on 17/06/16.
 */
var mongoose = require('../../../lib/mongoose'), Schema = mongoose.Schema;
const config = require('../../../config');
const crypto = require('crypto');

var schema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    firstName: {
        type: String,
        required: false
    },
    lastName: {
        type: String,
        required: false
    },
    hashedPassword: {
        type:String,
        required: true
    },
    salt: {
        type:String,
        required: true
    } ,
    email: {
        type: String,
        unique: true,
        required: true
    },
    roles: [String],
    providers: [String],
    created: {
        type: Date,
        default: Date.now
    }
});

schema.methods.encryptPassword = function (password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    return crypto.pbkdf2Sync(password, this.salt, 100000, 512, 'sha512');

};

schema.virtual('password')
    .get( ()=>  this._plainPassword )
    .set ( function (password) {
        this._plainPassword = password;
        this.hashedPassword =  this.encryptPassword(password);
    });

schema.methods.getUserProfile = function() {
    return {
        id: this.id,
        username: this.username,
        email: this.email,
        roles: this.roles
    }
};


schema.methods.checkPassword = () => (password) => {
    console.log('valid password', this);
    return this.hashedPassword === this.encryptPassword(password);
};

module.exports = mongoose.model('User', schema);

// userSchema.methods.generateJwt = function() {
//     var expiry = new Date();
//     expiry.setDate(expiry.getDate() + 7);
//
//     return jwt.sign({
//         _id: this._id,
//         email: this.email,
//         name: this.name,
//         exp: parseInt(expiry.getTime() / 1000)
//     }, config.get('secret'));
// };
