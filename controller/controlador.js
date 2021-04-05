let funcion = require('../functions/utils/encriptar');
var config = require('../config/config');
var dbConfig = global.gConfig.database_config;

exports.consultar = async (req, res) => {

    let parametros = {
        'query': req.query,
        'path': req.params,
        'body': req.body,
        'headers': req.headers
    };
    
    res.send(funcion.encriptar(parametros.body.dato));
}