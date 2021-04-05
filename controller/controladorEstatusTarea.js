let put_tarea = require('../functions/function/eliminarTarea');
let fs = require('fs');
let { HTTP } = require('../config/codigos_http');

exports.update = async (req, res) => {
    let respuesta_json = JSON.parse(fs.readFileSync('config/respuesta.json') );
        let path = req.params;
    try {
        await put_tarea.update(path);
        respuesta_json.mensaje=HTTP._200.mensaje;
        res.status(HTTP._200.estatus).send(respuesta_json);
    } catch (error) {
        respuesta_json.mensaje=HTTP._500.mensaje;
        res.status(HTTP._500.estatus).send(respuesta_json);
    } finally {
        return;
    }
    
}