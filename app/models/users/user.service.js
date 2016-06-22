/**
 * Created by vadimsky on 17/06/16.
 */
var User = require("./user");

/**
 * @param userName
 * @param password
 *
 * @return user or undefined
 */
function login(userName, password) {
    return undefined;
}


module.exports.register = () => {
    let user  = new User();
    user.save((err) => {
        
    });
    
}