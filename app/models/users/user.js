/**
 * Created by vadimsky on 17/06/16.
 */
var mongoose = require('../../../lib/mongoose'),
    Schema = mongoose.Schema;
const config = require('../../../config');
const crypto = require('crypto');



var userSchema = new Schema({
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
    email: {
        type: String,
        unique: true,
        required: true
    },
    roles: [String],
    providers: [String],
    salt: String,
    created: {
        type: Date,
        default: Date.now
    }
});


userSchema.methods.encryptPassword =  function (password) {
    console.log('encrypt');
    var salt = crypto.randomBytes(16).toString('hex');
    //this.hashedPassword = crypto.pbkdf2Sync(password, this.salt, 100000, 512, 'sha512');
    return crypto.pbkdf2Sync(password, salt, 100000, 512, 'sha512');
};

userSchema.virtual('password')
    .get( () => this._plainPassword )
    .set = (password) =>  {
        this._plainPassword = password;
        this.salt = crypto.randomBytes(16).toString('hex');
        this.hashedPassword =  this.encryptPassword(password);
    };


userSchema.methods.checkPassword = () => (password) => {
    console.log('valid password', this);
    return this.hashedPassword === this.encryptPassword(password);
};



module.exports = mongoose.model('User', userSchema);

///
// userSchema.methods.setPassword = (password) => {
//     this.salt = crypto.randomBytes(16).toString('hex');
//     this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
// };
//
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
