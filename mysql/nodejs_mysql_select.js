// 导入mysql
const mysql = require('mysql');

// 连接mysql
const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'password',
    port: '3306',
    database: 'test',
});

connection.connect();

// 查询语句
let sql = 'SELECT * FROM article';

// 执行查询语句
connection.query(sql, (err, data) => {
    if (err) {
        console.log('[SELECT ERROR] - ', err.message);
        return;
    }

    // 查询成功
    console.log(data);
});
connection.end();

