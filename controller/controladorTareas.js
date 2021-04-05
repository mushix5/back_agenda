let get_tareas = require('../functions/function/consultaTareas');
let fs = require('fs');
let { HTTP } = require('../config/codigos_http');

exports.consultar = async (req, res) => {
    let respuesta_json = JSON.parse(fs.readFileSync('config/respuesta.json') );
    let path = req.params
    try {
        let result = await get_tareas.consulta(path);
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