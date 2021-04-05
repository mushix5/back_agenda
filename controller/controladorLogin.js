let get_usuario = require('../functions/function/consultaUsuario');
let fs = require('fs');
let {
    HTTP
} = require('../config/codigos_http');
let funcion = require('../functions/utils/encriptar');
let des = require('../functions/utils/desencriptar');

exports.consultar = async (req, res) => {
    let respuesta_json = JSON.parse(fs.readFileSync('config/respuesta.json'));
    let parametros = {
        'query': req.query,
        'path': req.params,
        'body': des.desencriptar(req.body.datos, true),
        'headers': req.headers
    };
    let correo = parametros.body.correo;
    let pass = parametros.body.pass;
    let encript;
    if (!correo || !pass) {
        respuesta_json.mensaje = HTTP._400.mensaje;
        res.status(HTTP._400.estatus).send(respuesta_json);
        return;
    }
    try {
        let result = await get_usuario.consulta({
            correo: parametros.body.correo
        });
        if (!result.length) {
            respuesta_json.mensaje = HTTP._404.mensaje;
            res.status(HTTP._404.estatus).send(respuesta_json);
            return;
        }
        if ((correo === result[0].correo) && (pass === result[0].pass)) {
            encript =
                await funcion.encriptar({
                    id_usuario: result[0].id_usuario,
                    correo: result[0].correo,
                    nombre: result[0].nombre,
                    id_roll: result[0].id_roll,
                    login: true
                }, true);
        } else {
            encript =
                await funcion.encriptar({
                    login: false
                }, true)
        }
        respuesta_json.resultado = encript;
        respuesta_json.mensaje = HTTP._200.mensaje;
        res.status(HTTP._200.estatus).send(respuesta_json);
    } catch (error) {
        respuesta_json.mensaje = HTTP._500.mensaje;
        res.status(HTTP._500.estatus).send(respuesta_json);
    } finally {
        return;
    }

}