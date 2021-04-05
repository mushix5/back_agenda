let jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();

exports.encriptar = function (dato, result = false) { 
    var token = jwt.sign(dato, result ? process.env.SECRET_RES : process.env.SECRET);
    return token;
};