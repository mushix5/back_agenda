let funcion = require('../functions/utils/desencriptar');

const conexion = require('./conexion.json');
const environment = process.env.NODE_ENV || 'development';
const environment_config = conexion[environment];
environment_config.database_config.host = funcion.desencriptar( environment_config.database_config.host);
environment_config.database_config.database = funcion.desencriptar( environment_config.database_config.database);
environment_config.database_config.user = funcion.desencriptar( environment_config.database_config.user);
environment_config.database_config.password = funcion.desencriptar( environment_config.database_config.password);
const final_config = environment_config;

global.gConfig = final_config;
