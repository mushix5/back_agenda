let jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();

exports.desencriptar = function (dato, result = false) { 
    let token;
    try {
        token = jwt.verify(dato, result ? process.env.SECRET_RES : process.env.SECRET);
    } catch (error) {
        console.log('error: ',error)
        token = false
    }
    return token;
};