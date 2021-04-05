var express = require('express');
var controlador = require('../controller/controlador');
var usuarioId = require('../controller/controladorUsuarioId');
var usuarios = require('../controller/controladorUsuarios');
var login = require('../controller/controladorLogin');
var registro = require('../controller/controladorRegistroUsuario');
var estatus = require('../controller/controladorEstatusUsuario');
var estatusTarea = require('../controller/controladorEstatusTarea');
var registraTarea = require('../controller/controladorRegistraTarea');
var tareasId = require('../controller/controladorTareas');
var router = express.Router();

router.get('/usuarios', usuarios.consultar);
router.get('/usuario/:id_usuario', usuarioId.consultar);
router.post('/login', login.consultar);
router.post('/usuario/registrar', registro.registrar);
router.put('/usuario/:id_usuario', estatus.update);
router.post('/encriptar', controlador.consultar);

router.put('/tarea/:id_registro', estatusTarea.update);
router.post('/tarea', registraTarea.registrar);
router.get('/tareas/:id_usuario', tareasId.consultar);

module.exports = router;