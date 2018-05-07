const mysql = require('mysql');

const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'password',
    port: '3306',
    database: 'test',
});

connection.connect();

let sql = "insert into article (title, author, date) values ('Tody in nice', 'Bob', now())";

connection.query(sql, (err, result) => {
    if (err) {
        throw err;
    }
    console.log('插入成功');
    console.log(result);
});

connection.end();

