require('../../config/config');
const mysql = require('mysql');
const dbConfig = global.gConfig.database_config;

exports.consulta = async function (req, res) {
    return new Promise((resolve, reject) => {
        conn = mysql.createConnection(dbConfig);
        conn.connect();
        query(req, function (err, content) {
            if (err) {
                reject(err)
            } else {
                resolve(content);
            }
        });
    })

}

function query(req, callback) {
    let conn;
    let datos_conexion = dbConfig;
    datos_conexion.dateStrings= true;
    let cadena = 'select id_registro, titulo, descripcion, fecha_inicio, fecha_fin from registros where id_usuario = ? && activo = ?';
    let param = [req.id_usuario, 1]
    conn = mysql.createConnection(datos_conexion);
    conn.connect();
    conn.query(cadena,
        param,
        function (err, rows) {
            conn.end();
            if (err) callback(err, null);
            callback(null, rows);
        });
}