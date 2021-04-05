require('../../config/config');
const mysql = require('mysql');
const dbConfig = global.gConfig.database_config;

exports.registrar = async function (req, res) {
    return new Promise((resolve, reject) => {
        conn = mysql.createConnection(dbConfig);
        conn.connect();
        query(req, function(err, content){
            if(err){
                reject(err)
            }else{
                resolve(content);
            }
        });
    })
   
}

function query(req, callback) {
    let conn;
    let cadena = 'insert into registros value (?, ?, ?, ?, ?, ?, ?);';
    let param = [null, req.id_usuario, req.titulo, req.descripcion, req.fecha_inicio, req.fecha_fin, true]
    conn = mysql.createConnection(dbConfig);
    conn.connect();
    conn.query(cadena,
        param,
        function (err, result) {
            conn.end();
            if (err) callback(err, null);
            callback(null, result);
        });
}