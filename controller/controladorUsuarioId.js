let get_usuario = require('../functions/function/consultaUsuario');
let fs = require('fs');
let { HTTP } = require('../config/codigos_http');

exports.consultar = async (req, res) => {
    let respuesta_json = JSON.parse(fs.readFileSync('config/respuesta.json') );
    let parametros = {
        'query': req.query,
        'path': req.params,
        'body': req.body,
        'headers': req.headers
    };
    try {
        let result = await get_usuario.consulta(parametros.path);
        respuesta_json.resultado = result;
        if(!result.length){
            respuesta_json.mensaje=HTTP._404.mensaje;
            res.status(HTTP._404.estatus).send(respuesta_json);
            return;
        }
        respuesta_json.mensaje=HTTP._200.mensaje;
        res.status(HTTP._200.estatus).send(respuesta_json);
    } catch (error) {
        respuesta_json.mensaje=HTTP._500.mensaje;
        res.status(HTTP._500.estatus).send(respuesta_json);
    } finally {
        return;
    }
    
}