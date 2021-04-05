let post_tarea = require('../functions/function/crearTarea');
let get_tarea = require('../functions/function/validadorFecha');
let fs = require('fs');
let { HTTP } = require('../config/codigos_http');

exports.registrar = async (req, res) => {
    let respuesta_json = JSON.parse(fs.readFileSync('config/respuesta.json') );
    let body = req.body;
    if(!body.fecha_inicio || !body.fecha_fin || !body.titulo || !body.id_usuario){
        respuesta_json.mensaje=HTTP._400.mensaje;
        res.status(HTTP._400.estatus).send(respuesta_json);
        return;
    }
    try {
        let result = await get_tarea.consulta(body);
        if(result[0].registros){
            respuesta_json.mensaje=HTTP._200.error_fecha;
            res.status(HTTP._200.estatus).send(respuesta_json);
            return;
        }
        await post_tarea.registrar(body);
        respuesta_json.mensaje=HTTP._201.mensaje;
        res.status(HTTP._201.estatus).send(respuesta_json);
    } catch (error) {
        respuesta_json.mensaje=HTTP._500.mensaje;
        res.status(HTTP._500.estatus).send(respuesta_json);
    } finally {
        return;
    }
    
}