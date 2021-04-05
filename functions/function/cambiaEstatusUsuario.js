require('../../config/config');
const mysql = require('mysql');
const dbConfig = global.gConfig.database_config;

exports.update = async function (req, res) {
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
    let cadena = 'update usuarios set activo = !activo where id_usuario = ?;';
    let param = [req.id_usuario]
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