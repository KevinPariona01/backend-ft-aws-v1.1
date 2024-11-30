const md5 = require("md5");

function encryptPassword(pass){
    return md5(pass);
}

module.exports = {
    encryptPassword
}