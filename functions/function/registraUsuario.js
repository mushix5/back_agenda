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
    let cadena = 'insert into usuarios value (?, ?, ?, ?, ?, ?);';
    let param = [null, req.id_roll, req.correo, req.pass, req.nombre, true]
    conn = mysql.createConnection(dbConfig);
    conn.connect();
    conn.query(cadena,
        param,
        function (err, result) {
            conn.end();
            if (err) {
                if(err.code === "ER_DUP_ENTRY"){
                    callback(null, false);
                } else {
                    callback(err.code, null);
                }
            }
            callback(null, result);
        });
}