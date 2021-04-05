require('../../config/config');
const mysql = require('mysql');
const dbConfig = global.gConfig.database_config;

exports.consulta = async function (req, res) {
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
    let cadena="";
    let param=[];
    if(req.correo){
        cadena = 'select id_usuario, correo, nombre, pass, id_roll from usuarios where correo = ? && activo = ?';
        param = [req.correo,true]
    }else if(req.id_usuario){
        cadena = 'select id_usuario, correo, nombre from usuarios where id_usuario = ? && activo = ?';
        param = [req.id_usuario,true]
    }
    else{
        cadena = 'select id_usuario, correo, nombre, activo, id_roll from usuarios';
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