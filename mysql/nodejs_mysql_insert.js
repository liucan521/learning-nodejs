// 引入mysql
const mysql = require('mysql');

// 连接myql
const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'password',
    port: '3306',
    database: 'test',
});

connection.connect();

// 插入语句
let addSql = "insert into article (title, author, date) values (?, ?, now())";
let addSqlParams = ['Today is noce', 'Bob'];

// 执行插入语句
connection.query(addSql, addSqlParams, (err, result) => {
    if (err) {
        throw err;
    }

    // 插入成功输出
    console.log('插入成功');
    console.log(result);
});

// 断开连接msyql
connection.end();

