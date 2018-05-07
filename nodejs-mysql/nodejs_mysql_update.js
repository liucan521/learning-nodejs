const mysql = require('mysql');

const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'password',
    port: '3306',
    database: 'test'
});

connection.connect();

let sql = "update article set title= '今晚学习' where id like 10";

connection.query(sql, (err, data) => {
    if (err) {
        throw err;
    }
    console.log('upload success!');
    console.log(data)
});

connection.end();