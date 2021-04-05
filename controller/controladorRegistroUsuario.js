let set_usuario = require('../functions/function/registraUsuario');
let fs = require('fs');
let {
    HTTP
} = require('../config/codigos_http');
let des = require('../functions/utils/desencriptar');

exports.registrar = async (req, res) => {
    let respuesta_json = JSON.parse(fs.readFileSync('config/respuesta.json'));
    let registro = fs.existsSync('config/registroUnico.json');
    let body = des.desencriptar(req.body.datos, true);
    if (!body.correo || !body.pass || !body.nombre) {
        respuesta_json.mensaje = HTTP._400.mensaje;
        res.status(HTTP._400.estatus).send(respuesta_json);
        return;
    }
    if (registro) {
        body.id_roll = 2;
    } else {
        body.id_roll = 1;
    }
    try {
        let salida = await set_usuario.registrar(body);
        if(!salida){
            respuesta_json.mensaje = HTTP._404.correo;
        res.status(HTTP._404.estatus).send(respuesta_json);
        return;
        }
        if (!registro) {
            fs.writeFile("config/registroUnico.json", "", function (err) {
                if (err) {
                    return console.log(err);
                }
                console.log("Primer registro creado");

            });
        }
        respuesta_json.mensaje = HTTP._201.mensaje;
        res.status(HTTP._201.estatus).send(respuesta_json);
    } catch (error) {
        respuesta_json.mensaje = HTTP._500.mensaje;
        res.status(HTTP._500.estatus).send(respuesta_json);
    } finally {
        return;
    }

}