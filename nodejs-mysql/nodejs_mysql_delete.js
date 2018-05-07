const mysql = require('mysql');

const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'password',
    port: '3306',
    database: 'test'
});

let sql = "delete from article where id = 10";

connection.query(sql, (err, data) => {
    if (err) {
        throw err;
    }
    console.log('delete success!');
    console.log(data);
});

connection.end();