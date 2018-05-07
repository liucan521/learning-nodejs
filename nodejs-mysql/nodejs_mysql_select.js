const mysql = require('mysql');

const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'password',
    port: '3306',
    database: 'test',
});

connection.connect();

let sql = 'SELECT * FROM article';
//查
connection.query(sql, (err, data) => {
    if (err) {
        console.log('[SELECT ERROR] - ', err.message);
        return;
    }
    console.log(data);
});
connection.end();

