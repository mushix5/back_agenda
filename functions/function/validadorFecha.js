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
    let cadena = 'select count(id_registro) as registros from registros ' +
        'where id_usuario = ? and activo = ? and  ((fecha_inicio between ? and ?) or (fecha_fin between ? and ?))'
    let param = [req.id_usuario, 1, req.fecha_inicio, req.fecha_fin, req.fecha_inicio, req.fecha_fin]
    if(req.id_registro){
        cadena = `${cadena} and id_registro = ?`
        param.push(req.id_registro)
    }
    conn = mysql.createConnection(dbConfig);
    conn.connect();
    conn.query(cadena,
        param,
        function (err, rows) {
            conn.end();
            if (err) callback(err, null);
            callback(null, rows);
        });
}